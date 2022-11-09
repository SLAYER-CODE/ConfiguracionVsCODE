import { BaseEntity, Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, RelationId, OneToOne, JoinColumn, Double, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Field, Float, GraphQLISODateTime, ID, InputType, Int, ObjectType } from 'type-graphql'
import { Discounts } from "./Business";
import { Products } from "./Products";
import { Deliveries } from "./Delivery";
import { Users } from "./Users";
//Estos son para el carrito de compras del usuario y los productos que se esten vendiedo segun el usuario

@ObjectType()
@Entity({ name: "shoppingcart_product" })
export class ShoppingProducts extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id' })
    id!: number;

    @ManyToOne(type => ShoppingCart, product_id => product_id.shoppingCardt_id, {
        cascade: ["remove", "update"], onUpdate: "CASCADE", onDelete: "CASCADE"
    })
    @Field(() => ShoppingCart)
    @JoinColumn()
    wish_id!: ShoppingCart[]

    @ManyToOne(type => Products, product_id => product_id.product_id, {
        onUpdate: "CASCADE", onDelete: "NO ACTION"
    })
    @Field(() => Products)
    @JoinColumn()
    product_id!: Products[]

    @Field(() => Int)
    @Column()
    product_quantity!: number
}
// @InputType()

@ObjectType()
@Entity({ name: "shoppingcart" })
export class ShoppingCart extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', })
    shoppingCardt_id!: number;
}


// @ObjectType()
// @Entity({name:"wish_product"})
// export class  Wishes_Products extends BaseEntity  {
//     @Field(()=>ID)
//     @PrimaryColumn('int', { generated: true })
//     id!:number;

//     @ManyToMany(type => ListWish, product_id=>product_id.wish_id, {
//         cascade: ["remove","update"],onUpdate:"CASCADE",onDelete:"CASCADE"
//     })
//     @Field(()=>ListWish)
//     @JoinColumn()
//     wish_id!:ListWish[]

//     @ManyToMany(type => Products, product_id=>product_id.product_id, {
//         onUpdate:"CASCADE",onDelete:"NO ACTION"
//     })
//     @Field(()=>Products)
//     @JoinColumn({referencedColumnName:"product"})
//     product_id!:Products[]
// }



// @InputType()

@ObjectType()
@Entity({ name: 'listwish' })
export class ListWish extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', })
    wish_id!: number;

    @ManyToOne(type=>Users,usuario=>usuario.user_id ,{
        onUpdate:"CASCADE"
    })
    @Field(()=>Users)
    @JoinColumn({name:"user_id",referencedColumnName:"user_id"})
    user_id!:Users;

    @ManyToMany(type => Products, wish_products_id => wish_products_id.product_id, {
        cascade: ["remove", "update"], onUpdate: "CASCADE", onDelete: "CASCADE"
    })

    @Field(() => [Products])
    @JoinTable({name:"wish_product",joinColumn: {name:"product_id",referencedColumnName:"wish_id"},inverseJoinColumn:{name:"wish_id",referencedColumnName:"product_id"} })
    wish_products_id!: Products[]
}


//Direcciones de delivery para entrega de Productos y registro emdiante imagenes

@ObjectType()
@Entity({ name: 'orderhistory' })
export class OrderHistory extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', })
    id!: number

    @OneToOne(type => Deliveries, delivery_id => delivery_id.delivery_id, {
        cascade: ["update"], onUpdate: "CASCADE", onDelete: "NO ACTION"
    })
    @Field(() => Deliveries)
    @JoinColumn()
    delivery_id	!: Deliveries;

    @OneToOne(type => ShoppingCart, shoppingCart_id => shoppingCart_id.shoppingCardt_id, {
        cascade: ["remove", "update"], onUpdate: "CASCADE", onDelete: "CASCADE"
    })
    @Field(() => ShoppingCart)
    @JoinColumn()
    shoppingCart_id	!: ShoppingCart

    @Field(() => GraphQLISODateTime)
    @Column({
        nullable: false,
        type: 'datetime'
    })
    order_date!: Date

    @OneToOne(type => Discounts, discount_code => discount_code.discount_code, {
        cascade: ["update"], onUpdate: "CASCADE", onDelete: "NO ACTION"
    })
    @Field(() => Discounts)
    @JoinColumn()
    discount_code!: Discounts


    @Field(() => Float)
    @Column({ type: 'float' })
    product_totalPrice!: number


    @Field(() => Float)
    @Column({ type: 'float'})
    delivery_price	!: number
}   

