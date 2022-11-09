import string
from tkinter.tix import Tree
from typing import List
from regex import E
from sqlalchemy import false, true


def analiticArchive(analitc,saveanalitic):
    conteo=0
    with open(saveanalitic,"a") as readarchive: 
        with open(analitc,"r") as archive:
            for x in archive:
                if(len(x.split("|"))>4):
                    readarchive.write(x)
                    conteo+=1
    print("EXISTEN {}".format(conteo))
def searchcurse(analicuser:str,curseSearch:str):
    serachs=[]
    with open(analicuser,"r") as archive:
        for x in archive:
            if(curseSearch in x):
                serachs.append(x)
    
    print(serachs)
    
def serializeUsers(analicuser:str):
    sinfoni=[]
    with open(analicuser,"r") as archive:
        for x in archive:
            serachs={"Notuser":[],"curse":[]}
            curses=x.split("Id de curso")
            for s in curses[1:]:
                curse={}
                for h in s.split("|"):
                    k=h.split(":")
                    if(len(h)>1):
                        if(h[0]==":"):
                            curse["Id de curso"]=k[1]
                        else:
                            curse[k[0]]="".join(k[1:])
                serachs["curse"].append(curse)
            for p in curses[:1]:
                for g in p.split("|"):
                    serachs["Notuser"].append(g)
            serachs["curse"]=reformateCurse(serachs["curse"])
            sinfoni.append(serachs)
    return sinfoni
    
def comprobateinelement(cursos:list,elemeto:str):
    for x in cursos:
        if(x["UUID"]==elemeto):
            return True
    return False

def reformateCurse(curse:list): 
    retornod=[]
    for x in curse:
        if(not comprobateinelement(retornod,x["UUID"])):
            retornod.append(x)
        else:
            key="Fecha de Inscripccion"
            retornod[-1][key]+="|{}".format(x[key])
    return retornod     
            

def getCurses(analicuser:str):
    serachs=[]
    with open(analicuser,"r") as archive:
        for x in archive:
            for p in x.split("|"):
                if("Nombre" in p):
                    print("{}".format(p))
    
    print(serachs)
    
def SearchCurseInUsers(users:List,search:str):
    return list(filter(lambda x: bool(len([s for s in x["curse"] if(search.upper() in s["Nombre"] or  search.lower() in s["Nombre"] )])) ,users))


def deserializeusers(users:list,archive:str):
    with open(archive,"a") as file:
        for x in users:
            stringer=""
            for k in x["Notuser"]:
                stringer+="{}|".format(k)
            for s in x["curse"]:
                stringer+="{}|".format(s.get("Nombre"))
            stringer
            file.write(stringer+'\n')
        
def main():
    
    #SIRVE PARA OBTENER LOS USUARIOS QUE FUNCIONAN A OTRO ARCHIVO
    # analiticArchive("userscopy.txt","analiticuser.txt")
    analiticArchive("UserExtractSubCurse.txt","UserFilterImportantCloudComputing.txt")
    
    #SIRVE PRA INSPECCIONAR LOS CURSOS EN UN ARCHIVO BUSCANDO Y SERIALIZANDO O DESEREALIZANDO
    # serializado=serializeUsers("UserExtractFormating.txt")
    # final=SearchCurseInUsers(serializado,"CLOUD COMPUTING")
    # deserializeusers(final,"UsersFilterImportant.txt")
    # print(final)
    

  
if(__name__=="__main__"):
    main()