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
@Entity({ name: 'owner' })
export class Owner extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', })
    owner_id!: number

    @Field(() => String)
    @Column({ length: 30, type: "varchar", nullable: false })
    first_name!: string

    @Field(() => String)
    @Column({ length: 30, type: "varchar", nullable: true })
    second_name!: string
    


    @Field(() => String)
    @Column({ length: 30, type: "varchar", nullable: false })
    surname	!: string


    @Field(() => String)
    @Column({ length: 30, type: "varchar", nullable: false })
    second_surname!: string

}



@ObjectType()
@Entity({ name: 'discount' })
export class Discounts extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn('varchar', { length: 7, name: 'discount_code' })
    discount_code!: string;


    @Field(() => Float)
    @Column({ type: 'float', precision: 1, scale: 1 })
    discount!: number


    @Field(() => GraphQLISODateTime)
    @Column({
        nullable: false,
        type: 'timestamp'
    })
    public_date!: Date


    @Field(() => GraphQLISODateTime)
    @Column({ nullable: false, type: 'timestamp' })
    delete_date	!: Date
}


@ObjectType()
@Entity({ name: 'rating' })
export class Ratings extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', })
    rating_id!: number;

    @Field(() => Float)
    @Column({ type: 'double', precision: 1, scale: 1 })
    rating!: number


    @Field(() => String)
    // @Column({ type: 'text',length:200})
    @Column({ type: 'text' })
    remarks!: string

}


