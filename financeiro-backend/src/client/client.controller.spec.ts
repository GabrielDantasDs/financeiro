import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaPromise } from '@prisma/client';

describe('ClientController', () => {
  let controller: ClientController;
  let service: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [ClientService, {
        provide: PrismaService,
        useValue: {
          client: {
            findMany: jest.fn(),
          },
        },
      },],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    service = module.get<ClientService>(ClientService)
  });

  describe("findAll", () => {
    it("should return an array of clients", async () => {
      const result = [{
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        document: '1234567890',
        phone: '555-5555',
        address: '123 Main St',
        neighborhood: 'Downtown',
        number: '1A',
        state: 'State',
        city: 'City',
        zip_code: '12345',
        created_at: new Date()
      }];

      const mockPrismaPromise = {
        then: jest.fn((resolve) => resolve(result)),
        catch: jest.fn(),
        finally: jest.fn()
      } as unknown as PrismaPromise<typeof result>;

      jest.spyOn(service, 'findAll').mockImplementation(() => mockPrismaPromise)

      expect(await controller.findAll()).toBe(result);
    })
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
