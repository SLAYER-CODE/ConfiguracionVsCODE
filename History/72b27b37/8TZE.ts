import { BaseEntity, Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, RelationId, OneToOne, JoinColumn, Double, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Field, Float, GraphQLISODateTime, ID, InputType, Int, ObjectType } from 'type-graphql'
import { Ratings } from "./Business";
import { Directions,Users } from "./Users";
import { Products } from "./Products";

@ObjectType()
@Entity({ name: 'gps_user' })
export class GpsUser extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', })
    gps_id	!: number

    @Field(() => String)
    @Column({ length: 10, type: "varchar", nullable: false })
    direccion!:String


    @Field(()=>String)
    @Column({type:"varchar",nullable:true})
    latitud!:String

    @Field(()=>String)
    @Column({type:"varchar",nullable:true})
    longitud!:String


    @OneToOne(type => Users, phone_id => phone_id.gps_user)
    @Field(() => Users, { nullable: true })
    user_id!: Users;
}


@ObjectType()
@Entity({ name: 'gps_user' })
export class GpsServices extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', })
    gpsService_id	!: number

    @Field(() => String)
    @Column({ length: 10, type: "varchar", nullable: false })
    direccion!:String


    @Field(()=>String)
    @Column({type:"varchar",nullable:true})
    latitud!:String

    @Field(()=>String)
    @Column({type:"varchar",nullable:true})
    longitud!:String

    @ManyToOne(type => Products, product_id => product_id.gps_relation, {
        cascade: ["remove", "update"], onUpdate: "CASCADE", onDelete: "NO ACTION", createForeignKeyConstraints: true
    })
    @Field(() => Products,{nullable:true})
    @JoinColumn({ name: "gps_relation", referencedColumnName: "product_id"})
    // @TypeormLoader()
    // @JoinTable({name:"columnauserandpwd",joinColumn:{name:"user_id",referencedColumnName:'user_id'},inverseJoinColumn:{name:"user_id",referencedColumnName: 'user_id'}})
    gps_relation?: Products

}