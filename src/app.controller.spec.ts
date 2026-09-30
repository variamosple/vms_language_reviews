import { describe, expect, it, vi } from 'vitest';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import type { Response } from 'express';
import type { DataSource } from 'typeorm';

interface HealthJsonResult {
  status: string;
  serviceName: string;
  version: string;
  uptimeSeconds: number;
  timestamp: string;
  responseTimeMs: number;
  checks: {
    database: {
      status: string;
      latencyMs: number;
      message?: string;
    };
    memory: {
      usedMb: number;
      totalMb: number;
      percentage: number;
    };
  };
}

describe('AppController', () => {
  it('should return health status UP when database query succeeds', async () => {
    const mockAppService = { getHello: vi.fn().mockReturnValue('Hello World!') } as unknown as AppService;
    const mockDataSource = {
      query: vi.fn().mockResolvedValue([{ '?column?': 1 }]),
    } as unknown as DataSource;

    const controller = new AppController(mockAppService, mockDataSource);

    let statusResult = 0;
    let jsonResult: HealthJsonResult | null = null;

    const mockResponse = {
      status: (code: number) => {
        statusResult = code;
        return {
          json: (data: HealthJsonResult) => {
            jsonResult = data;
          },
        };
      },
    } as unknown as Response;

    await controller.getHealth(mockResponse);

    expect(statusResult).toBe(200);
    expect(jsonResult?.status).toBe('UP');
    expect(jsonResult?.serviceName).toBe('vms_language_reviews');
    expect(jsonResult?.checks.database.status).toBe('UP');
  });

  it('should return DEGRADED with 503 when database query fails', async () => {
    const mockAppService = { getHello: vi.fn().mockReturnValue('Hello World!') } as unknown as AppService;
    const mockDataSource = {
      query: vi.fn().mockRejectedValue(new Error('Connection lost')),
    } as unknown as DataSource;

    const controller = new AppController(mockAppService, mockDataSource);

    let statusResult = 0;
    let jsonResult: HealthJsonResult | null = null;

    const mockResponse = {
      status: (code: number) => {
        statusResult = code;
        return {
          json: (data: HealthJsonResult) => {
            jsonResult = data;
          },
        };
      },
    } as unknown as Response;

    await controller.getHealth(mockResponse);

    expect(statusResult).toBe(503);
    expect(jsonResult?.status).toBe('DEGRADED');
    expect(jsonResult?.checks.database.status).toBe('DOWN');
  });
});
