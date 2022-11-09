import { BaseEntity, Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, RelationId, OneToOne, JoinColumn, Double, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Field, Float, GraphQLISODateTime, ID, InputType, Int, ObjectType } from 'type-graphql'

@ObjectType()
@Entity({ name: "brand" })
export class Brands extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id' })
    brand_id!: number;
    @Field(() => String)
    @Column({ length: 100 ,unique:true})
    brand_name!: string
}