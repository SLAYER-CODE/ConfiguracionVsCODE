import { BaseEntity, Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, RelationId, OneToOne, JoinColumn, Double, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Field, Float, GraphQLISODateTime, ID, InputType, Int, ObjectType } from 'type-graphql'


// @ObjectType()
// @Entity({ name: "product_category" })
// export class Categories_Products extends BaseEntity {
//     @PrimaryGeneratedColumn()
//     id!: number;

//     @ManyToMany(type => Products, product_id => product_id.product_id, {
//         cascade: ["remove", "update"], onUpdate: "CASCADE", onDelete: "CASCADE"
//     })
//     // @Column()
//     @Field(() => [Products])
//     @JoinTable({ name: 'product_id' })
//     // @JoinColumn({referencedColumnName:"product"})
//     product_id!: Products[]

//     // @Column()
//     @ManyToMany(type => Categories, product_id => product_id.category_id, {
//         cascade: ["remove", "update"], onUpdate: "CASCADE", onDelete: "CASCADE"
//     })
//     @Field(() => [Categories])
//     // @JoinColumn()
//     @JoinTable({ name: 'category_id' })
//     category_id	!: Categories[]
// }


@ObjectType()
@Entity({ name: "category" })
export class Categories extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id' })
    category_id!: number;


    @Field(() => String)
    @Column({ length: 100 })
    category_name!: string
    
}