import argparse
from ast import arg
from inspect import Traceback
# import win32com.client
import os
from tkinter.tix import Tree
from xxlimited import Str
import aiofiles
from datetime import datetime
import pathlib
from sqlalchemy import Float, false, true

from ubjson import EncoderException

from conn import Connect
from Asincrone import Asincrone


class Metadates(object):
    # import eyed3 as __Library_Metdada__DLL
    _META = [
        'Name',
        'Size',
        'Item type',
        'Date modified',
        'Date created',
        'Date accessed',
        'Attributes',
        'Offline status',
        'Availability',
        'Perceived type',
        'Owner',
        'Kind',
        'Date taken',
        'Contributing artists',
        'Album',
        'Year',
        'Genre',
        'Conductors',
        'Tags',
        'Rating',
        'Authors',
        'Title',
        'Subject',
        'Categories',
        'Comments',
        'Copyright',
        '#',
        'Length',
        'Bit rate',
        'Protected',
        'Camera model',
        'Dimensions',
        'Camera maker',
        'Company',
        'File description',
        'Masters keywords',
        'Masters keywords']
    # __DLL_SH = win32com.client.gencache.EnsureDispatch('Shell.Application', 0)

    def __new__(cls, *args, **kwargs):
        cls.Metadatos = dict()
        return super(Metadates, cls).__new__(cls)

    def __init__(self, *args, **kwargs):
        self._args = list(args)
        self.__GETATTR(self._args)

    def __GETATTR(self, args):
        for x in args:
            __DLL_NS = Metadates.__DLL_SH.NameSpace(os.getcwd())
            item = __DLL_NS.ParseName(str(x))
            for id, attr in enumerate(Metadates._META):
                attr_value = __DLL_NS.GetDetailsOf(item, id)
                self.Metadatos[attr] = attr_value

    def __get_Meta(self):
        return self.Metadatos

    def __set_Meta(self, arg: str):
        self._args.append(arg)
        self.__GETATTR(self._args)

    Met = property(__get_Meta, __set_Meta)


class Root(object):
    def __init__(self, items: list) -> None:
        self.list = items

    async def _analyseFile(self, file):
        async with file as f:
            content = await f.read()
            print(content)

    def _analysize(self):
        for lib in self.list:
            for libFile in lib:

                self._analyseFile(libFile)


if __name__ == '__main__':

    # Argpase filtro de examenes de
    parse_filters_eval = argparse.ArgumentParser(
        add_help=False, formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parse_filterseval = parse_filters_eval.add_argument_group(
        title="Filtros de Evaluacion",
        description="Filtra las evaluaciones que seran ubicadas por medio el curso selecionado")

    parse_filterseval.add_argument(
        "--excludeLeter",
        "-eL",
        dest="exleter",
        type=str,
        action="store",
        help="Excluira todos las palabras que encuentre en las practicas",
        nargs="+",
        metavar="1 2 3 4",
        default=[])
    parse_filterseval.add_argument(
        "--filterLeter",
        "-fL",
        dest="filleter",
        type=str,
        action="store",
        nargs="+",
        help="Filtra las preguntas que deceamos tener ",
        metavar="12 3 5 6 1",
        default=[])

    # Argapser filstro de Usuarios
    parse_filters_user = argparse.ArgumentParser(
        add_help=False, formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parse_filtersgroup = parse_filters_user.add_argument_group(
        title="Filtros de Usuarios",
        description="Busca o excluye Usuarios que no quieres que aparecescan en la lista ")
    parse_filtersgroup.add_argument(
        "--exclude",
        "-eU",
        type=str,
        nargs="+",
        help="Exluira todos los usuarios con caracteristicas",
        metavar="123467@senati.pe",
        default=[])
    parse_filtersgroup.add_argument(
        "--filter",
        "-fU",
        type=str,
        nargs="+",
        help="Filtra a los usurios que necesitemos",
        metavar="123467@senati.pe 123467@senati.pe",
        default=[])

    parserTerminal_parent = argparse.ArgumentParser(
        add_help=False,
        formatter_class=argparse.RawTextHelpFormatter,
        argument_default=argparse.REMAINDER)
    pUPS = parserTerminal_parent.add_subparsers(
        metavar="Opciones de Terminal",
        title="Termianal",
        description="Opciones para el terminal",
        help="Estas opciones son de simple estetica y organisacion si se necesita que todo este organizado o que tenga un mejor orden")

    cPupsTerm = pUPS.add_parser(
        "!termOptions",
        aliases=["!T"],
        help="Opciones de la terminal donde se muestran los datos")
    cPupsTerm.add_argument(
        "--extTerm",
        "-eT",
        dest="externalterminal",
        action="store_true",
        required=False,
        help="Abre las session en una terminal diferente")
    cPupsTerm.add_argument(
        "--colorTerm",
        "-cT",
        dest="colorterminal",
        action="store_true",
        required=False,
        help="Pinta con colores la terminal",
        default=False)
    parserTerminal_parent.set_defaults(colorterminal=False)

    # Opciones para la selecion de los cursos
    parserUsers_parent = argparse.ArgumentParser(
        add_help=False, formatter_class=argparse.RawTextHelpFormatter)

    # parserUsers_parent.add_argument("--manually","-m",action="store",type=str,required=False,help="Inserta el id del curso donde ese encuentra")
    parserUsers_parent.add_argument(
        "--extractCurseOperation",
        "-Ecu",
        action="store_true",
        dest="extratcurseoperation",
        help="Inserta el id del Curso Ejemplo: __1922_1 si no se inserta entonces pedira saldra un menu donde pida que tipo de examen es el que se busca")
    cPups = parserUsers_parent.add_argument_group("Cursos")
    cPups.add_argument(
        "--curse",
        "-c",
        action="store",
        type=str,
        required=False,
        help="Inserta el id del Curso Ejemplo: __1922_1 si no se inserta entonces pedira saldra un menu donde pida que tipo de examen es el que se busca")
    cPups.add_argument(
        "--subCurse",
        "-s",
        action="store",
        type=str,
        required=False,
        help="Inserta el id del curso donde ese encuentra Ejemplo: __1922_1 si no se inserta entonces pedira saldra un menu donde pida que tipo de subcurse se necesita")
    evalcPus = cPups.add_mutually_exclusive_group(required=True,)
    evalcPus.add_argument(
        "--selectExamIntent",
        "-sI",
        type=str,
        nargs="+",
        help="Seleciona los intentos que se decea recopilar",
        metavar="2 1 ")
    evalcPus.add_argument(
        "--all",
        action="store_true",
        help="Seleciona todos los intentos que tiene la autoevaluacion")

    # BRUTEFORCE INIT
    parser_haking = argparse.ArgumentParser(
        add_help=False, formatter_class=argparse.RawTextHelpFormatter)
    haking_bruteforcer = parser_haking.add_argument_group("Haking BruteForce")
    haking_bruteforcer.add_argument(
        '--injectUsers',
        dest='injectUser',
        type=argparse.FileType('r+'),
        metavar='users.txt',
        help='Archivo que guardara los los datos [(#) Comentario[Error|TiempoExecd] ()[Si es correcto|Si se logro en N intentos]  (~)[Incorrect>Password Or Email] ]')
    haking_bruteforcer.add_argument(
        "--CuserUserExtract",
        "-CU",
        help="Inserte Curso del cual se obtendran usuarios por defecto se utilizara los usuarios selecionados",
        action="store",
        required=False,
        dest="targetCurse",
        metavar="__1422__",
        type=Str)
    haking_bruteforcer.add_argument(
        "--CuserExtract",
        "-CX",
        help="Seleccione si quiere obtener el curso",
        action="store_true",
        required=False,
        dest="userextratcurses")

    haking_bruteforcer.add_argument(
        "--limitUserPassword",
        "-ltp",
        help="Inserte Tiempo en segundos que se repetiran cuando inicie de injeccion de password",
        dest="limiUserPassword",
        metavar="0.2 2 3 4...",
        required=False,
        type=Float,
        default=0.0)
    haking_bruteforcer.add_argument(
        "--limitUserChange",
        "-luc",
        help="Inserte el tiempo que se repetira al realizara cuando se cambie de usuario",
        dest="limitUserChange",
        metavar="1 1.2 3 5...",
        required=False,
        type=Float,
        default=0.0)
    haking_bruteforcer.add_argument(
        "--limitUserProcess",
        "-lup",
        help="Inserte el tiempo en segundos que se repetira en cada procedimiento",
        dest="limitUserProcess",
        metavar="10 50 10...",
        required=False,
        type=Float,
        default=None)
    haking_bruteforcer.add_argument(
        "--subNoActive",
        "-sb",
        help="Si no decea entrar en la session de cada usuario analizado",
        action="store_true",
        dest="deactivatesub",
        required=False)

    prop_bruteHaking = haking_bruteforcer.add_mutually_exclusive_group(
        required=False)
    prop_bruteHaking.add_argument(
        "--pwd",
        help="Inserte Contraseña para pobrar ataque",
        action="store",
        dest="passwordHaking",
        metavar="****",
        type=Str)
    prop_bruteHaking.add_argument(
        '--pwdFile',
        dest='archivePwd',
        nargs='+',
        type=argparse.FileType('r+'),
        metavar='Archve.txt',
        help='Archivo que se itinerara para el ataque',
        default=None)

    # userunique=groupTypeUser.add_parser("!unique",aliases=["!U"],help="Inserete un solo usuario el analisi es profundo",parents=[parserUsers_parent,parse_filters_eval,parserTerminal_parent])
    # userunique.add_argument("--password","-p",help="Inserte la constraseña del usuaro",action="store",required=False,dest="password",metavar="****",default=None)
    # userunique.add_argument("--email","-e",help="Inserte el Iinicio de session",action="store",required=False,dest="email",metavar="**@senati.pe",default=None)

    # userall=groupTypeUser.add_parser("!many",aliases=["!M"],help="Inserte varios usuarios que estan en un archivo",parents=[parserUsers_parent,parse_filters_eval,parse_filters_user,parserTerminal_parent])
    # grupuser=userall.add_argument_group("SelecionUsers")
    # grupuser.add_argument('--fileusers','-fu', dest='usuariosFile',metavar='ArchiveUsers.txt', type=argparse.FileType('r+'),help='Selecione los usuarios que decea',action="store" )

    # INICIO DE SESSION CUENTA DE USUARIO PASSWORD ETC
    parser_useres = argparse.ArgumentParser(
        add_help=False, formatter_class=argparse.RawDescriptionHelpFormatter)
    groupTypeUser = parser_useres.add_subparsers(
        metavar="Methodos de Ingreso",
        title="Funciones",
        description="Funciones acerca de los usuarios donde se extraeran los datos",
        help="Analizar los datos de un usuario o varios usuarios",
        dest="metoduser",
        required=True)
    userunique = groupTypeUser.add_parser(
        "!unique",
        aliases=["!U"],
        help="Inserete un solo usuario el analisi es profundo",
        parents=[
            parserUsers_parent,
            parse_filters_eval,
            parserTerminal_parent])

    userunique.add_argument(
        "--password",
        "-p",
        help="Inserte la constraseña del usuaro",
        action="store",
        required=False,
        dest="password",
        metavar="****",
        default=None)
    userunique.add_argument(
        "--email",
        "-e",
        help="Inserte el Iinicio de session",
        action="store",
        required=False,
        dest="email",
        metavar="**@senati.pe",
        default=None)

    userall = groupTypeUser.add_parser(
        "!many",
        aliases=["!M"],
        help="Inserte varios usuarios que estan en un archivo",
        parents=[
            parserUsers_parent,
            parse_filters_eval,
            parse_filters_user,
            parserTerminal_parent])
    # grupouserAll=userall.add_mutually_exclusive_group(required=True)

    grupuser = userall.add_argument_group("SelecionUsers")

    # grupuser.add_argument('--archive','-a', dest='archives',nargs='+',
    #                     type=argparse.FileType('r+'),metavar='archivo1',
    # help='Selecione los archivos que decea entrar',default=None)

    grupuser.add_argument(
        '--fileusers',
        '-fu',
        dest='usuariosFile',
        metavar='ArchiveUsers.txt',
        type=argparse.FileType('r+'),
        help='Selecione los usuarios que decea',
        action="store",required=True)
    
    grupuser.add_argument(
        "--resultinclude",
        "-ri",
        dest="usersanaliticacces",
        action="store_true",
        help="Inserte si quiere analisar los resultados del archivo"
    )

    # INICIO mediante usuario anonimo o por varios archivos local y no local
    parser = argparse.ArgumentParser(
        description='Extraiga informacion de cunetas blackboard para el analisis de datos!')

    parserFinalAlgoritme = parser.add_argument_group("Algorithmin")
    analitycsParse = parserFinalAlgoritme.add_mutually_exclusive_group(
        required=True)
    analitycsParse.add_argument(
        "--lineal",
        '-l',
        dest="lineal",
        action="store_true",
        help="Utiliza el algoritmo lineal")
    analitycsParse.add_argument(
        "--curve",
        '-c',
        dest="curve",
        action="store_true",
        help="Utiliza el algoritmo de curva lineal")
    analitycsParse.add_argument(
        "--normal",
        '-n',
        dest="normal",
        action="store_true",
        help="Utiliza un analizis normal")

    parserFinalResults = parser.add_argument_group("Results")
    parserFinalResults.add_argument(
        '--result',
        '-r',
        dest="GResult",
        action="store",
        required=False,
        help="Genera un archivo con los resultados",
        default="Result_" +
        datetime.today().strftime('%Y.%m.%d|%H.%M') +
        ".txt")
    parserFinalResults.add_argument(
        '--image',
        '-i',
        dest="GImage",
        action="store_true",
        help="Genere un imagen apartir del algoritmo que se genero",
        default=False,
        required=False)
    parserFinalResults.add_argument(
        '--extra',
        '-e',
        dest="GExtra",
        action="store_true",
        help="Genere datos extras como Metadata o otras carcterisiticas",
        default=False,
        required=False)

    parser.add_argument(
        "-v",
        "--verbosity",
        action="count",
        help="Verbosidad deacuerdo al log [INFO,DEBUG,ERROR,CRITICAL]",
        default=0)
    parser.add_argument(
        '--debug',
        '-d',
        dest="debug",
        action="store_true",
        help="Debug para la aplicacion usando IPYTHON!! si este falla",
        default=False,
        required=False)
    parser.add_argument(
        '--author',
        '-at',
        dest="author",
        action="store",
        help="Autor de modificacion",
        default=False,
        required=False)
    parser.add_argument(
        '--saveMetadata',
        '-sM',
        dest="savemeta",
        action="store_true",
        help="Guarde los metadatos obtenidos por los archivos y su contenido",
        default=False,
        required=False)

    conectPaser = parser.add_argument_group("Connect")
    conectPaser.add_argument(
        '--addServer',
        '-a',
        dest="addserver",
        action="store_true",
        help="Inserte estos datos en el servidor",
        default=False,
        required=False)
    conectPaser.add_argument(
        '--serverproxy',
        '-sp',
        dest="serverproxy",
        action="store_true",
        help="Los datos de los usuarios se iniciaran mediante el servidor",
        default=False,
        required=False)
    conectPaser.add_argument(
        '--tor',
        '-t',
        dest="tor",
        action="store_true",
        help="Los datos de navegacion pasaran mediante Tor",
        default=False,
        required=False)
    conectPaser.add_argument(
        '--proxy',
        '-px',
        dest="proxymanually",
        action="store",
        help="Inserte el proxy por el cual pasara los datos",
        default=False,
        required=False)

    grupo1 = parser.add_subparsers(
        metavar="Metodos",
        title="INICIO",
        description="Analizar los datos localmenete o por cuentas",
        help="Inserte el primer inicio local luego puede pedir ayuda --help para el siguiente paso",
        dest="metodo",
        required=True)

    usergrupo = grupo1.add_parser(
        "!RED",
        aliases=["!R"],
        parents=[
            parser_useres,
            parser_haking],
        help="Obten los datos mediante la Red")
    usergrupo.add_argument(
        "--anonymusUsers",
        "-anU",
        action="store_true",
        default=False,
        dest="usuarioanonimo")

    localgroup = grupo1.add_parser(
        "!LOCAL",
        aliases=["!L"],
        parents=[
            parse_filters_eval,
            parserTerminal_parent],
        help="Seleciona los datos localmente para analizarlos")
    localgroupgrpup = localgroup.add_argument_group("Data Local")
    grupo = localgroupgrpup.add_mutually_exclusive_group(required=True)

    grupo.add_argument(
        '--file',
        '-f',
        dest="carpetas",
        metavar='carpeta1',
        type=pathlib.Path,
        nargs="+",
        help='Selecione la carpeta contenedora',
        default=[])

    grupo.add_argument(
        '--archive',
        '-a',
        dest='archives',
        nargs='+',
        type=argparse.FileType('r+'),
        metavar='archivo1',
        help='Selecione los archivos que decea entrar',
        default=None)

    localgroup.add_argument(
        "--options",
        "-o",
        help="Sirve para como un separador para las opciones por ejemplo !Terminal",
        action="store_true")
    servergroup = grupo1.add_parser(
        "!SERVER",
        aliases=["!S"],
        parents=[
            parse_filters_eval,
            parse_filters_user,
            parserTerminal_parent],
        help="Selecione los datos preselecionados desde el servidor")
    # servergroup.set_defaults(colorterminal=False)
    args = parser.parse_args()

    # input(args)
    # INICIANDO LA APLICACION!!
    import logging
    # from IPython.core.debugger import Pdb
    from Formaterloggin import CustomFormatterPrinc
    from Formaterloggin import CustomFormatter

    import ipdb
    import traceback
    import sys
    from prompt_toolkit import prompt
    from prompt_toolkit.validation import Validator
    from menu import PasswordValidator, EmailValidator
    import asyncio
    try:
        logger = logging.getLogger('APP')
        logger.setLevel(args.verbosity)
        ch = logging.StreamHandler()
        ch.setFormatter(CustomFormatter(
            datefmt='%H:%M:%S', color=args.colorterminal))
        logger.addHandler(ch)
        logger.info(args)

        # INICIANDO APLICACION PRINCIPAL
        dir = []
        if(args.metodo in ["!LOCAL", "!L"]):
            logger.info("Iniciando de forma local")
            if(args.carpetas):
                for carpetax in args.carpetas:
                    logger.info(
                        "Analizando La carpeta {}".format(carpetax.name))
                    if(carpetax.is_dir()):

                        # if(os.path.exists)
                        dir += [[aiofiles.open(os.getcwd() + "\\" + carpetax + "\\" + y, "r+", encoding="utf-8") for y in x] for x in [
                            (os.path.exists(carpetax) and os.path.isdir(carpetax) and os.listdir(carpetax))] if not isinstance(x, bool)]
                    else:
                        logger.debug(
                            "Esta no es una carpeta! {}".format(carpetax.name))
                        logger.debug("Omitiendo...")
                if(dir):
                    logger.info(
                        "Se obtubo los sigueintes datos {}".format(dir))
                else:
                    logger.info("Sin Datos... {}".format(dir))
            else:
                dir += [args.archives]
            Libs = Root(dir)

        elif(args.metodo in ["!RED", "!R"]):
            logger.info("Iniciando desde la Red")
            if(args.usuarioanonimo):
                pass
            else:
                if(args.metoduser in ["!unique", "!U"]):
                    logger.info("Iniciando con usuario unico")
                    logger.info("Validando credenciales...")
                    if(args.password is None or args.email is None):
                        logger.info("Contraseña o email sin insertar...")
                        logger.info("Pidiendo Datos")
                        args.email = prompt(
                            'Inserte su email: ',
                            validator=EmailValidator(),
                            validate_while_typing=True)
                        args.password = prompt(
                            'Inserte su contraseña: ',
                            is_password=True,
                            validator=PasswordValidator(),
                            validate_while_typing=True)
                        AsincroneSession = Asincrone(
                            idcurses=args.curse, idsubitem=args.subCurse, logger=logger)
                        loop = asyncio.get_event_loop()
                        loop.run_until_complete(AsincroneSession.mainUsersMany(
                            [[args.email, args.password, "SLAYER"]]))

                elif(args.metoduser in ["!many", "!M"]):
                    logger.info("Iniciando con varios usuarios")

                    if(args.usuariosFile):
                        logger.info(
                            "Identificando el archivo de usuarios [{}]".format(
                                args.usuariosFile.name))
                        users = []
                        command = 0
                        for y, x in enumerate(args.usuariosFile.readlines()):
                            if(x[0] == ":"):
                                logger.info("Se encontro comando")
                                # print(x[1:])
                                if(x[1:].rstrip("\n") == "users"):
                                    logger.info("Analizando usuarios...")
                                    command = 1
                                elif(x[1:].rstrip("\n")=="results"):
                                    break
                            else:
                                if(command == 1):
                                    if(x[0] != "#" and x[0] != "~"):
                                        users.append(
                                            list(map(lambda a: a.rstrip(), x.rstrip("\n").split("|")[:3])))

                                elif(command == 2):
                                    pass
                        logger.debug(
                            "Los usuarios son los siguientes \n{}".format(users))
                        logger.info("Iniciando Conexiones de usuarios")

                        AsincroneSession = Asincrone(
                            idcurses=args.curse, idsubitem=args.subCurse, logger=logger)
                        loop = asyncio.get_event_loop()
                        loop.run_until_complete(
                            AsincroneSession.mainUsersMany(users, args))
                    else:
                        logger.info("Archivo no encontrado...")

        elif(args.metodo in ["!SERVER", "!S"]):
            logger.info("Iniciando desde el servidor")

    except EncoderException as ERROR:
        logger.error("Ubo un error")
        if(args.debug):
            extype, value, tb = sys.exc_info()
            if(args.colorterminal):
                print(
                    "\033[38;2;255;0;0m" +
                    traceback.format_exc() +
                    "\033[0;m")
            else:
                traceback.print_exc()
            logger.debug(
                "Entrando al Modo de depuracion! PARA VER el error inserte 'ERROR'")
            ipdb.post_mortem(tb)
        else:
            raise ERROR
else:
    print("Este archivo no se puede importar Intente Ingresar Parametros para su inicialisacion!!")
