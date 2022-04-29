import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedData1651210067381 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "customer" ("name", "phone", "email", "street","city","state","profilePic") VALUES 
                ('Sarath', 828133, 'sarath@zamaon.com', 'PK','KZ','KL','sb.jpg')`,
    );
    await queryRunner.query(`INSERT INTO "customer" ( "name", "phone", "email", "street","city","state","profilePic") VALUES 
            ( 'Saljo', 95391, 'saljo@zamaon.com', 'TK','CLT','KL','saljo.jpg')`);

    await queryRunner.query(`INSERT INTO "customer" ( "name", "phone", "email", "street","city","state","profilePic") VALUES 
            ( 'Hashrin', 67578, 'hcp@zamaon.com', 'BS','KZ','KL','hcp.jpeg')`);

    await queryRunner.query(
      `INSERT INTO "product" ( "name", "image", "description", "unit_price") VALUES ( 'Product 1', 'p1.png', 'Product 1 description', 10)`,
    );
    await queryRunner.query(
      `INSERT INTO "product" ("name", "image", "description", "unit_price") VALUES ( 'Product 2', 'p2.png', 'Product 2 description', 20)`,
    );
    await queryRunner.query(
      `INSERT INTO "product" ( "name", "image", "description", "unit_price") VALUES ('Product 3', 'p3.png', 'Product 3 description', 30)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE "customer"`);
    await queryRunner.query(`TRUNCATE TABLE "product"`);
  }
}
