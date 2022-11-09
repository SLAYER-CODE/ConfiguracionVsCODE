import { BaseEntity, Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, RelationId, OneToOne, JoinColumn, Double, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Field, Float, GraphQLISODateTime, ID, InputType, Int, ObjectType } from 'type-graphql'
import { Users } from "./Users";
import { Categories } from "./Categories";
import { Brands } from "./Brand";
import { type } from "os";
import { GpsServices } from "./GpsTrasos";

@ObjectType()
@Entity({ name: "product" })
export class Products extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id' })
    product_id!: number;


    @Field(() => String,{nullable:false})
    @Column({nullable:false})
    product_name!: string

    @Field(() => Float,{nullable:true})
    @Column({ type: 'decimal', precision: 8, scale: 2,nullable:true,comment:"Precion anterior que tenia el cliente"})
    old_price!: number

    @Field(() => Float,{nullable:true})
    @Column({ type: 'decimal', precision: 8, scale: 2,nullable:false })
    price_unity?: number

    @Field(() => Float,{nullable:false})
    @Column({ type: 'decimal', precision: 8, scale: 2,nullable:false })
    price_cantidad: number


    @Field(() => String)
    @Column({ length: 200, nullable: true,default:"Producto Agregado en :"+ Date.now().toString()})
    description?: string

    // @Field(() => String)
    // @Column({ type: "text",nullable:true,default:null,comment:"Marca a la que pertence el producto."})
    // brand!: string
    
    @ManyToMany(type => Brands, brands_products => brands_products.brand_id, {
        cascade: ["remove", "update","insert",], onUpdate: "CASCADE", onDelete: "CASCADE",eager:true
    })
    @Field(() => [Brands],{nullable:true})
    @JoinTable({name:"product_brand",joinColumn: {name:"product_id",referencedColumnName:"product_id"},inverseJoinColumn:{name:"brand_id",referencedColumnName:"brand_id"}})
    brands_products?: Brands[]


    @Field(() => GraphQLISODateTime)
    @Column({
        nullable: true,
        type: 'datetime'
    })
    update_product!: Date

    @Field(() => Int)
    @Column({nullable:true,default:null})
    quantity_cantidad?: number

    @Field(() => Int)
    @Column({nullable:true,default:null})
    quantity_unity?: number


 


    // @Column({name:"user_id"})
    @ManyToOne(type => Users, user_id => user_id.userProducts, {
        cascade: ["remove", "update"], onUpdate: "CASCADE", onDelete: "CASCADE", createForeignKeyConstraints: true,eager:true
    })
    @Field(() => Users,{nullable:true})
    @JoinColumn({ name: "user_relation", referencedColumnName: "user_id"})
    // @TypeormLoader()
    // @JoinTable({name:"columnauserandpwd",joinColumn:{name:"user_id",referencedColumnName:'user_id'},inverseJoinColumn:{name:"user_id",referencedColumnName: 'user_id'}})
    user_relation?: Users


    // @RelationId((usuario:Products) => usuario.user)
    //Columna para el desarollo 
    // @Column({ nullable: false })
    // user_id!: number

    //FUncion de datos 
         
    //Columa de muchos a muchos para realizar consultas rapidamente 
    @ManyToMany(type => Categories, category_products => category_products.category_id, {
        cascade: ["remove", "update","insert",], onUpdate: "CASCADE", onDelete: "CASCADE",eager:true
    })
    @Field(() => [Categories],{nullable:true})
    @JoinTable({name:"product_category",joinColumn: {name:"product_id",referencedColumnName:"product_id"},inverseJoinColumn:{name:"category_id",referencedColumnName:"category_id"} })
    category_products?: Categories[] 



    @ManyToMany(type => Users, category_products => category_products.user_id, {
        cascade: ["remove", "update","insert",], onUpdate: "CASCADE", onDelete: "CASCADE",eager:true
    })
    @Field(() => [Users],{nullable:true})
    @JoinTable({name:"contrate_user",joinColumn: {name:"product_id",referencedColumnName:"product_idContrate"},inverseJoinColumn:{name:"user_id",referencedColumnName:"user_idContrate"} })
    contrate_user?: Users[] 

    
    @OneToMany(() => ProductImages, (productoImages) => productoImages.product_relation, 
    { cascade: ["insert",],eager:true})
    @Field((type) => [ProductImages],{nullable:true})
    // @TypeormLoader((course: Products) => course.user_id, { selfKey: true })
    image_realation?: ProductImages[];


    @OneToMany(() => GpsServices, (productoImages) => productoImages.gps_relation, 
    { cascade: ["insert",],nullable:true})
    @Field((type) => [GpsServices],{nullable:true})
    // @TypeormLoader((course: Products) => course.user_id, { selfKey: true })
    gps_relation?: GpsServices[];
    

}


@ObjectType()
@Entity({ name: "productimage" })
export class ProductImages extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id' })
    image_id!: number;



    @Field(() => String)
    @Column({ type: "text", nullable: true })
    image_description!: string

    @Field(() => String,{nullable:true})
    @Column({  type: "text",nullable:true })
    image_name!: string
    // @OneToMany(type => ProductStates, state_id => state_id.state_id, {
    //     cascade: ["remove", "update"], onUpdate: "CASCADE", onDelete: "CASCADE"
    // })
    // @Field(() => ProductStates)
    // @JoinColumn()
    // state_id!: ProductStates

    //Product
    @ManyToOne(type => Products, product_id => product_id.image_realation, {
        cascade: ["remove", "update"], onUpdate: "CASCADE", onDelete: "NO ACTION", createForeignKeyConstraints: true
    })
    @Field(() => Products,{nullable:true})
    @JoinColumn({ name: "product_relation", referencedColumnName: "product_id"})
    // @TypeormLoader()
    // @JoinTable({name:"columnauserandpwd",joinColumn:{name:"user_id",referencedColumnName:'user_id'},inverseJoinColumn:{name:"user_id",referencedColumnName: 'user_id'}})
    product_relation?: Products
}



@ObjectType()
@Entity({ name: "product_state" })
export class Products_States extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn('int', { generated: true })
    id!: number;
    @OneToMany(type => Products, product_id => product_id.product_id, {
        cascade: ["remove", "update"], onUpdate: "CASCADE", onDelete: "CASCADE"
    })
    @Field(() => Products)
    @JoinColumn()
    product_id	!: Products

    @OneToMany(type => ProductStates, state_id => state_id.state_id, {
        cascade: ["remove", "update"], onUpdate: "CASCADE", onDelete: "CASCADE"
    })
    @Field(() => ProductStates)
    @JoinColumn()
    state_id!: ProductStates

}

@ObjectType()
@Entity({ name: "productstates" })
export class ProductStates extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id' })
    state_id!: number;

    @Field(() => String)
    @Column({ length: 200, type: "varchar" })
    state!: string


 
}

