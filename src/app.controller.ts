import os from 'node:os';
import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import type { Response } from 'express';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly startTime = Date.now();

  constructor(
    private readonly appService: AppService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth(@Res() res: Response): Promise<void> {
    const reqStart = Date.now();
    let dbStatus: 'UP' | 'DOWN' = 'UP';
    let dbLatencyMs = 0;
    let dbMessage: string | undefined;

    try {
      const t0 = Date.now();
      await this.dataSource.query('SELECT 1');
      dbLatencyMs = Date.now() - t0;
    } catch (error) {
      dbStatus = 'DOWN';
      dbMessage = (error as Error).message;
    }

    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;

    const checks = {
      database: {
        status: dbStatus,
        latencyMs: dbLatencyMs,
        ...(dbMessage ? { message: dbMessage } : {}),
      },
      memory: {
        usedMb: Math.round(usedMemory / (1024 * 1024)),
        totalMb: Math.round(totalMemory / (1024 * 1024)),
        percentage: Number(((usedMemory / totalMemory) * 100).toFixed(1)),
      },
    };

    const overallStatus = dbStatus === 'UP' ? 'UP' : 'DEGRADED';
    const statusCode =
      overallStatus === 'UP' ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE;

    res.status(statusCode).json({
      status: overallStatus,
      serviceName: 'vms_language_reviews',
      version: process.env.npm_package_version || '1.0.0',
      uptimeSeconds: Math.floor((Date.now() - this.startTime) / 1000),
      timestamp: new Date().toISOString(),
      responseTimeMs: Date.now() - reqStart,
      checks,
    });
  }
}
