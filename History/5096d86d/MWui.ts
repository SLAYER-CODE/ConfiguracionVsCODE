import { BaseEntity, Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, RelationId, OneToOne, JoinColumn, Double, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Field, Float, GraphQLISODateTime, ID, InputType, Int, ObjectType } from 'type-graphql'
import { Users } from "./Users";

@ObjectType()
@Entity({ name: 'user_notification' })
export class Users_Notifications extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn('int', { generated: true })
    id!: number;


    @ManyToMany(type => Users, emisor_id => emisor_id.user_id, {
        cascade: ["remove", "update"], onUpdate: "CASCADE", onDelete: "CASCADE"
    })
    @Field(() => Users)
    @JoinColumn()
    emisor_id!: Users[]

    @ManyToMany(type => Notifications, product_id => product_id.notification_id, {
        cascade: ["remove", "update"], onUpdate: "CASCADE", onDelete: "CASCADE"
    })
    @Field(() => Notifications)
    @JoinColumn()
    notification_id	!: Notifications[]

    @ManyToMany(type => Users, receptor_id => receptor_id.user_id, {
        cascade: ["update"], onUpdate: "CASCADE", onDelete: "NO ACTION"
    })
    @Field(() => Users)
    @JoinColumn()
    receptor_id	!: Users[]
}

@ObjectType()
@Entity({ name: 'notification' })
export class Notifications extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', })
    notification_id	!: number

    @Field(() => String)
    @Column({ length: 100, type: "varchar", nullable: false })
    subject	!: string

    @Field(() => String)
    @Column({ type: "text", nullable: false })
    message	!: string


    @Field(() => GraphQLISODateTime)
    @Column({
        nullable: false,
        type: 'timestamp'
    })
    send_date!: Date

    @OneToMany(type => AttachdImages, image => image.notification_id) // note: we will create author property in the Photo class below
    photos: AttachdImages[];

}


@ObjectType()
@Entity({ name: 'attachedimage' })
export class AttachdImages extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', })
    image_id!: number

    @Field(() => Blob)
    @Column({
        nullable: false,
        type: 'binary'
    })
    image!: string

    @ManyToOne(type => Notifications, receptor_id => receptor_id.notification_id, {
        cascade: ["remove", "update"], onUpdate: "CASCADE", onDelete: "CASCADE"
    })
    @Column({
        nullable:true,
        type:'int'
    })
    @Field(() => Notifications,{description:"Relacion de varias imagenes a una notificacion...",nullable:false,defaultValue:10})
    @JoinColumn({ name: 'notification_id', referencedColumnName: 'notification_id' })
    notification_id!: Notifications
}