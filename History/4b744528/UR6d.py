from regex import E
from sqlalchemy import false, true


def analiticArchive(analitc,saveanalitic):
    with open(saveanalitic,"a") as readarchive: 
        with open(analitc,"r") as archive:
            for x in archive:
                if(len(x.split("|"))>4):
                    readarchive.write(x)

def searchcurse(analicuser:str,curseSearch:str):
    serachs=[]
    with open(analicuser,"r") as archive:
        for x in archive:
            if(curseSearch in x):
                serachs.append(x)
    
    print(serachs)
    
def serializeUsers(analicuser:str,curseSearch:str):
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
    print(sinfoni)
    
def comprobateinelement(cursos:list,elemeto:str)->bool:
    for x in cursos:
        if(x["UUID"]==elemeto):
            return true
    return false

def reformateCurse(curse:list): 
    retornod=[]
    for x in curse:
        if(not comprobateinelement(retornod,x["UUID"])):
            retornod.append(x)
    return retornod     
            
230
def getCurses(analicuser:str):
    serachs=[]
    with open(analicuser,"r") as archive:
        for x in archive:
            for p in x.split("|"):
                if("Nombre" in p):
                    print("{}".format(p))
    
    print(serachs)
    
def serializeUsersAnalitics(analicuser:str):
    with open(analicuser,"r") as archive:
        for x in archive:
            datos=x.split("|")

            
def main():
    # analiticArchive("userscopy.txt","analiticuser.txt")
    serializeUsers("analiticuser.txt","CLOUD COMPUTING")
    # getCurses("analiticuser.txt")
if(__name__=="__main__"):
    main()