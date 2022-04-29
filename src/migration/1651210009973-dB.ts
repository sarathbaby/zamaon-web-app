import {MigrationInterface, QueryRunner} from "typeorm";

export class dB1651210009973 implements MigrationInterface {
    name = 'dB1651210009973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phone" integer NOT NULL, "email" character varying NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "profilePic" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "customerId" integer NOT NULL, "total_quantity" integer NOT NULL, "total_price" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, "description" character varying NOT NULL, "unit_price" integer NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderitem" ("id" SERIAL NOT NULL, "orderId" integer NOT NULL, "productId" integer NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "raw_total" integer NOT NULL, CONSTRAINT "PK_b7f87d0e20dee3122eb2810d7ae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderitem" ADD CONSTRAINT "FK_a15ebbc0e6cb61cf91be01a0028" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderitem" ADD CONSTRAINT "FK_0c9d9af9dc338c87895e8cd0f66" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderitem" DROP CONSTRAINT "FK_0c9d9af9dc338c87895e8cd0f66"`);
        await queryRunner.query(`ALTER TABLE "orderitem" DROP CONSTRAINT "FK_a15ebbc0e6cb61cf91be01a0028"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"`);
        await queryRunner.query(`DROP TABLE "orderitem"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
