import { BaseEntity, Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, RelationId, OneToOne, JoinColumn, Double, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Field, Float, GraphQLISODateTime, ID, InputType, Int, ObjectType } from 'type-graphql'
import { Ratings } from "./Business";
import { Directions,Users } from "./Users";

@ObjectType()
@Entity({ name: 'delivery' })
export class Deliveries extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', })
    delivery_id	!: number

    @Field(() => GraphQLISODateTime)
    @Column({ nullable: false, type: 'timestamp' })
    min_date!: Date


    @Field(() => GraphQLISODateTime)
    @Column({ nullable: false, type: 'timestamp' })
    max_date!: Date

    @OneToMany(type => DeliviveryDrivers, deliveryDriver_id => deliveryDriver_id.deliveryDriver_id, {
        cascade: ["remove", "update"], onUpdate: "CASCADE", onDelete: "CASCADE"
    })
    @Field(((type) => [DeliviveryDrivers]))
    @JoinColumn()
    deliveryDriver_id!: DeliviveryDrivers

    @Field(() => String)
    @Column({ length: 10, type: "varchar", nullable: false })
    state!: string

    @Field(() => Int)
    @Column({ type: "integer" })
    rating_id!: number
}


@ObjectType()
@Entity({ name: 'deliverydriver' })
export class DeliviveryDrivers extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', })
    deliveryDriver_id!: number;


    @OneToOne(type => Users, user_id => user_id.user_id, {
        cascade: ["remove", "update"], onUpdate: "CASCADE", onDelete: "CASCADE"
    })
    @Field(() => Users)
    @JoinColumn()
    user_id	!: Users

    @Field(() => String)
    @Column({ length: 50, type: "varchar", nullable: false })
    vehicle!: string

    @OneToOne(type => Ratings, rating_id => rating_id.rating_id, {
        cascade: ["remove", "update"], onUpdate: "CASCADE", onDelete: "CASCADE"
    })
    @Field(() => Ratings)
    @JoinColumn()
    rating_id!: Ratings
}


@ObjectType()
@Entity({ name: 'via' })
export class Vias extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', })
    via_id!: number;

    @Field(() => String)
    @Column({ length: 30, type: "varchar", nullable: false })
    type_via!: string

    @Field(() => String)
    @Column({ length: 100, type: "varchar", nullable: false })
    via_name!: string

    @OneToMany(type => Directions, direction_id => direction_id.direction_id, {
        cascade: ["update"], onUpdate: "CASCADE", onDelete: "NO ACTION"
    })
    @Field(() => Directions)
    @JoinColumn()
    direction_id!: Directions
}



@ObjectType()
@Entity({ name: 'returned' })
export class Returned extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', })
    returned_id!: number

    @Field(() => String)
    @Column({ length: 50, type: "varchar", nullable: false })
    reason!: string


    @Field(() => String)
    // @Column({length:300,type:"text",nullable:false})
    @Column({ type: "text", nullable: false })
    description!: string


    @Field(() => Int)
    @Column()
    delivery_id	!: number


    @OneToMany(type => Users, user_id => user_id.user_id, {
        cascade: ["remove", "update"], onUpdate: "CASCADE", onDelete: "CASCADE"
    })
    @Field(((type) => [Users]))
    @JoinColumn()
    user_id	!: Users
}


@ObjectType()
@Entity({ name: 'retornedimage' })
export class RetornedImages extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', })
    image_id!: number


    @Field(() => Blob)
    @Column({ type: "array", nullable: false })
    image!: string


    @Field(() => String)
    // @Column({length:300,type:"text",nullable:false})
    @Column({ type: "text", nullable: false })
    description	!: string


    @OneToMany(type => Returned, returned_id => returned_id.returned_id, {
        cascade: ["remove", "update"], onUpdate: "CASCADE", onDelete: "CASCADE"
    })
    @Field(((type) => [Returned]))
    @JoinColumn()
    returned_id	!: Returned[]
}


