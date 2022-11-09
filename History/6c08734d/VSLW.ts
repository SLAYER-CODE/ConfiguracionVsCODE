import { BaseEntity, Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, RelationId, OneToOne, JoinColumn, Double, OneToMany, ManyToMany, JoinTable, ManyToOne, IsNull } from "typeorm";
import { Field, Float, GraphQLISODateTime, ID, InputType, Int, ObjectType } from 'type-graphql'
import { Products } from "./Products";
import { ListWish, ShoppingCart } from "./Shoping";
import { GpsUser } from "./GpsTrasos";


//Usuario enfocado al entorno Principal
@ObjectType()
@Entity({ name: 'user' })
export class Users extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', comment: "Id de la clase identificador User" })
    user_id!: number;

    @Field(() => String)
    @Column({ length: 28, type: "varchar", nullable: false })
    uid!: string;

    @Field(() => String)
    @Column({ type: "text", nullable: true })
    photo!: string;

    // @Field(()=>String)
    // @Column({length:100,type:"varchar",nullable:false})
    // lastname!:string;

    @Field(() => String)
    // @Column({length:50,type:"varchar",nullable:false,unique:true})
    @Column({ length: 50, type: "varchar", nullable: false })
    email!: string;

    @Field(() => String)
    // @Column({type:"varchar",nullable:false})
    @Column({ type: "text", nullable: false })
    lastToken!: string;

    @Field(() => GraphQLISODateTime)
    @Column({type: 'datetimeoffset'})
    birthday!: Date;

    @Field(() => Int, { nullable: true })
    @Column({ type: "integer", nullable: true })
    random_code!: number;

    @Field(() => String, { nullable: true })
    @Column({ type: "varchar", nullable: true })
    username!: string;


    @Field((type) => [Products],{nullable:true})
    @OneToMany(() => Products, (producto) => producto.user_relation, { cascade: false })
    // @TypeormLoader((course: Products) => course.user_id, { selfKey: true })
    userProducts?: Products[];
    
 

 

    //Lista de uno a uno con lista de deceos en el grafico esta de muchos a muchos pero no tiene sentido asi que se penso de uno a mucho para que el usuario pueda tener varias listas
    //Como las listas de reproduccion de youtube xd
    @OneToMany(type => ListWish, wish_id => wish_id.wish_id, {
        cascade: ["update", "insert"], onUpdate: "CASCADE", onDelete: "SET NULL"
    })
    @Field(() => ListWish, { nullable: true })
    wish_id!: ListWish[];



    //De igual forma que el de arriba el diagrama dice otra cosa :v pero la documentacion dice otra xddddd
    @OneToOne(type => ShoppingCart, shoppingCardt_id => shoppingCardt_id.shoppingCardt_id, {
        cascade: ["update", "insert"],
    })
    @Field(() => ShoppingCart, { nullable: true })
    @JoinColumn({ name: "shoppingCardt_id" })
    shoppingCardt_id!: ShoppingCart;


    @OneToOne(type => GpsUser, phone_id => phone_id.gps_id, {
        cascade: ["update", "insert","remove"]
    })
    @Field(() => GpsUser, { nullable: true })
    @JoinColumn({ name: "gps_id" })
    gps_id!: GpsUser;
    
    @OneToOne(type => Phone, phone_id => phone_id.phone_id, {
        cascade: ["update", "insert","remove"]
    })
    @Field(() => Phone, { nullable: true })
    @JoinColumn({ name: "phone_id" })
    phone_id!: Phone;


    @ManyToMany(type => Products, user_product => user_product.product_id, {
        cascade: ["remove", "update",], onUpdate: "CASCADE", onDelete: "CASCADE",eager:true,nullable:true
    },)
    @Field(() => [Products],{nullable:true})
    @JoinTable({name:"products_contrate",joinColumn: {name:"user_idContrate",referencedColumnName:"user_id"},inverseJoinColumn:{name:"product_idContrate",referencedColumnName:"product_id"} })
    contrate_products?: Products[] 
}



@ObjectType()
@Entity({ name: 'direction' })
export class Directions extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', })
    direction_id!: number;

    @Field(() => String)
    @Column({ length: 20, type: "varchar", nullable: false })
    country!: string

    @Field(() => String)
    @Column({ length: 100, type: "varchar", nullable: false })
    departament!: string

    @Field(() => String)
    @Column({ length: 100, type: "varchar", nullable: false })
    province!: string

    @Field(() => String)
    @Column({ length: 100, type: "varchar", nullable: true })
    distrit!: string

    @Field(() => String)
    @Column({ length: 100, type: "varchar", nullable: false })
    city!: string

    @Field(() => String)
    @Column({ length: 100, type: "varchar", nullable: true })
    urban_zone!: string

    @Field(() => String)
    @Column({ length: 10, type: "varchar", nullable: true })
    number!: string

    @Field(() => String)
    @Column({ length: 5, type: "varchar", nullable: true })
    mz!: string

    @Field(() => String)
    @Column({ length: 5, type: "varchar", nullable: true })
    lt!: string


    @Field(() => String)
    // @Column({length:500,type:"text",nullable:false})
    @Column({ type: "text", nullable: false })
    reference!: string


    @Field(() => String)
    @Column({ type: "varchar", nullable: false })
    postal_code	!: string


    @OneToMany(type => Users, user_id => user_id.user_id, {
        cascade: ["remove", "update"], onUpdate: "CASCADE", onDelete: "CASCADE"
    })
    @Field(() => Users)
    @JoinColumn()
    user_id!: Users
}


// @InputType()
@ObjectType()
@Entity({ name: 'phone' })
export class Phone extends BaseEntity {
    @Field(() => ID, { nullable: true })
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
    phone_id!: number;

    @Field(() => String)
    @Column({ type: "text", nullable: false })
    country_code!: string

    @Field(() => String, { nullable: true })
    @Column({ type: "text", nullable: true })
    phone_number!: string

    @OneToOne(type => Users, phone => phone.user_id,)
    @Field(() => Users, { nullable: true })
    user_id!: Users;
}