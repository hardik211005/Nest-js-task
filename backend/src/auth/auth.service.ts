import { Injectable, HttpException, HttpStatus, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService implements OnModuleInit {
  private db: Pool;

  constructor() {
    this.db = new Pool({
      host: process.env.DB_HOST || 'postgres',
      user: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || 'admin',
      database: process.env.DB_NAME || 'authdb',
    });
  }

  async onModuleInit() {
    try {
      await this.db.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('✅ Users table ensured');
    } catch (err) {
      console.error('❌ Failed to create users table:', err);
    }
  }

  private hash(password: string) {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  verifyPassword(password: string, hash: string) {
    return this.hash(password) === hash;
  }

  signToken(
    payload: any,
    type: 'ACCESS' | 'REFRESH',
    expiresIn: number,
  ) {
    const secret =
      type === 'ACCESS'
        ? process.env.ACCESS_SECRET || 'ACCESS_SECRET'
        : process.env.REFRESH_SECRET || 'REFRESH_SECRET';

    return jwt.sign(payload, secret, { expiresIn });
  }

  async signup(email: string, password: string) {
    const passwordHash = this.hash(password);

    try {
      await this.db.query(
        `INSERT INTO users (email, password_hash)
         VALUES ($1, $2)`,
        [email, passwordHash],
      );
    } catch (e: any) {
      console.error('Signup Error:', e); // LOG THE ERROR
      if (e.code === '23505') { // unique_violation code for postgres
        throw new HttpException(
          'User already exists',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Internal Server Error: ' + e.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUser(email: string) {
    const res = await this.db.query(
      `SELECT * FROM users WHERE email=$1`,
      [email],
    );
    return res.rows[0];
  }
}
