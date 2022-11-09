
from re import S
from tokenize import String
from typing import List, Tuple
from prompt_toolkit import prompt
from prompt_toolkit.completion import WordCompleter

from prompt_toolkit.validation import Validator, ValidationError
from prompt_toolkit import PromptSession
from prompt_toolkit.patch_stdout import patch_stdout
from prompt_toolkit import print_formatted_text as print
from prompt_toolkit.formatted_text import FormattedText

from prompt_toolkit.shortcuts import prompt
from prompt_toolkit.styles import Style

import inquirer


# html_completer = WordCompleter(['<html>', '<body>', '<head>', '<title>'])
# text = prompt('Enter HTML: ', completer=html_completer)
# print('You said: %s' % text)

class EmailValidator(Validator):
    def validate(self, document):
        text = document.text
        if("@" not in text):
            raise ValidationError(
                message='Es necesario el caracter separador "@"',
                cursor_position=len(text) - 1)
        elif(len(text.split("@")[0]) < 6):
            raise ValidationError(
                message='El correo debe tener mas de 6 dijitos',
                cursor_position=len(text) - 1)


class PasswordValidator(Validator):
    def validate(self, document):
        text = document.text
        if(len(text) <= 6):
            raise ValidationError(
                message='La contraseña debe ser mayor a 6 caracteres',
                cursor_position=len(text) - 1)

        if(text.islower() or text.isupper()):
            raise ValidationError(
                message='Es necesario mayusuculas y minusculas en la contraseña',
                cursor_position=len(text) - 1)


class NumberValidator(Validator):
    def __init__(self, offset=0, limit=0, *args, **kwargs):
        self.offset = offset
        self.limit = limit
        Validator.__init__(self, *args, **kwargs)

    def validate(self, document):
        text = document.text

        if text and not text.isdigit():
            i = 0
            for i, c in enumerate(text):
                if not c.isdigit():
                    break

            raise ValidationError(message='Inserte Numeros',
                                  cursor_position=i)
        if text.isdigit():
            number = int(text)
            if(type(number) == int):
                if(not(number >= self.offset and number <= self.limit)):
                    raise ValidationError(
                        message='Los dijitos deben estar entre [{} - {}]'.format(
                            self.offset, self.limit), cursor_position=len(text) - 1)


class NumberAndIndex(Validator):
    def __init__(self, offset=0, limit=0, listValidation=[], *args, **kwargs):
        self.offset = offset
        self.limit = limit
        self.indexes = listValidation
        Validator.__init__(self, *args, **kwargs)

    def validate(self, document):
        text = document.text.split(",")

        for i, c in enumerate(text):
            c = c.strip()
            if c.isdigit():
                number = int(c)
                if(type(number) == int):
                    if(not(number >= self.offset and number <= self.limit)):
                        raise ValidationError(message='Los dijitos deben estar entre [{} - {}]'.format(
                            self.offset, self.limit), cursor_position=sum(list(map(lambda s: len(s), text[:i]))))
            else:
                if(not (c in self.indexes) and c != ""):
                    raise ValidationError(message='No se encontro...')


class MenuTerminal(object):
    style = Style.from_dict({
        # User input (default text).
        '': '#ff0066',

        # Prompt.
        'username': '#884444',
        'at': '#00aa00',
        'colon': '#0000aa',
        'pound': '#00aa00',
        'host': '#00ffff bg:#444400',
        'path': 'ansicyan underline',
    })

    def __init__(self, NodePrev=None):
        self.session = PromptSession()
        self.Name = ""
        self._message = []
        self._completer = []
        self.nodeprev = NodePrev

    def get_message(self) -> List:
        return self._message

    def set_message(self, value):
        # username:str,host:str,users:List,real:str
        res = "\\"
        if(len(value[1]) != 0):
            if(len(value[1]) > 10):

                res = (res.join(value[1][:7])) + "..."
            else:
                if(len(value[1]) == 1):
                    res += value[1][0] + res
                else:
                    res = "|".join(value[1][:10])
        else:
            res += "[None]"

        self._message = [
            ('class:username', value[0]),
            ('class:at', '@'),
            ('class:colon', ':'),
            ('class:path', res),
            ('class:pound', ' #'),
            ('class:at bold', value[2].title()),
            ('#0000aa underline', ">>")
        ]

    message = property(get_message, set_message)

    # text = prompt(message, style=style)
    async def PrintUsers(self, AllUsers,UsersFor):
        UsersFor = AllUsers[0]["body"].get("results")
        StrMaxUName = max(UsersFor, key=lambda p: len(
            p["user"]["givenName"] + p["user"]["familyName"]))
        for x in UsersFor:
            user = x["user"]
            InfoNewUsers = FormattedText([
                ('#2EFE64', '|'),
                ('#58FAF4 bold', '{:^{}}'.format(user["givenName"] + " " + user["familyName"], len(
                    str(StrMaxUName["user"]["givenName"] + StrMaxUName["user"]["familyName"])) + 1)),
                ('#FFFF00', '|'),
                ('#2EFE64 underline', '{:^{}}'.format(user["userName"], len(str(max(
                    UsersFor, key=lambda p:len(p["user"].get("userName")))["user"].get("userName"))))),
                ('#2EFE64', '|'),
                ('#A4A4A4', '{:^{}}'.format(user["avatar"]["permanentUrl"], len(str(max(UsersFor, key=lambda p:len(
                    p["user"]["avatar"]["permanentUrl"]))["user"]["avatar"]["permanentUrl"])))),
                ('#2EFE64', '|'),
            ])
            # self.logger.info("\n\tUsuario: {} {} \n\tCorrero: {} \n\tAvatar: {}".format(user["givenName"],user["familyName"],user["userName"],user["avatar"]["permanentUrl"]))
            print(InfoNewUsers)
    async def InsertPwdUser(self, AllUsers, CurseSelectUser):
        usuarios = []
        UsersFor = AllUsers[0]["body"].get("results")
        self.PrintUsers(AllUsers,UsersFor)
        
        
        self._completer = ["Virutal22", "Virutal21", "Virutal20", "Virutal18"]
        self.message = ["SLAYER",
                        [self.nodeprev.Session[CurseSelectUser].username],
                        "inserte su contraseña"]
        with patch_stdout():
            contraseña = await PromptSession().prompt_async(self._message, completer=WordCompleter(self._completer), style=self.style, validator=None)
        for x in UsersFor:
            user = x["user"]
            usuarios.append([user["userName"],
                             contraseña,
                             user["givenName"] + " " + user["familyName"],
                             user["avatar"]["permanentUrl"]])
        return usuarios

    async def SelectCurse(self, curses):

        for x, y in enumerate(curses, 1):
            InfoCurses = FormattedText([
                ('#FE9A2E', '[{:0>{}}]'.format(x, len(str(len(curses))))),
                ('#2EFE64', '|'),
                ('#81F7F3 bold', '{:^{}}'.format(
                    y[2], len(max(curses, key=lambda s:len(s[2]))[2]))),
                ('#2EFE64', '|'),
                ('#8181F7 underline', '{:^{}}'.format(
                    y[0], len(max(curses, key=lambda s:len(s[0]))[0]))),
                ('#2EFE64', '|'),
                ('#58FA82 bold', '{:^{}}'.format(
                    y[1], len(max(curses, key=lambda s:len(s[1]))[1]))),
                ('#2EFE64', '|'),
                ('#FFFFFF bold', '{:0>{}}'.format(
                    y[4] + 1, len(str(max(curses, key=lambda s:s[4])[4])))),
                ('#2EFE64', '|'),
                ('#FFFF00', '{:^{}}'.format(
                    y[-1], len(str(max(curses, key=lambda s:s[-1])[-1])))),
                ('#2EFE64', '|'),
                ('#2EFE64 bold', '{}'.format("" * (y[-1] - y[3]))),
                ('#DF013A blink', '{}'.format("🔒" * (y[3]))),

            ])
            print(InfoCurses)
            # print("|({:0>{}}) | [{}] | {} | '{}' | {} | {}".format(x,len(str(len(curses))),    y[1],y[0],y[4], y[3],"🔒" if(y[2]) else " "))
        # insert=int(input("Insert >> "))
        # with patch_stdout():
            # insert = int( await self.session.prompt_async('Inserte>>: ',
            # validator=NumberValidator(1,len(curses))))-1
        self._completer = [x[2].strip() for x in curses]
        self.message = ["SLAYER", [
            x.username for x in self.nodeprev.Session], "selecione su curso"]
        with patch_stdout():
            insert = (await self.session.prompt_async(self._message, completer=WordCompleter(self._completer), style=self.style, validator=NumberAndIndex(1, len(curses), self._completer))).split(",")
            CursesSelect = [curses[x] for x in list(map(lambda x: (int(x.strip(
            )) - 1) if(x.strip().isdigit()) else self._completer.index(x.strip()), insert))]

        return CursesSelect

    async def SelectTerminalCurse(self):
        itemList = ["(1) Obtener los subcursos de los examenes",
                    "(2) Obtener los Usuarios que participen en el curso"]

        questions = [
            inquirer.List('res',
                          message="Me gustaria...",
                          choices=itemList,
                          ),
        ]
        answers = inquirer.prompt(questions)
        # with patch_stdout():
        # insert = int( await self.session.prompt_async('Inserte>>: ',
        # validator=NumberValidator(1,len(itemList))))
        return itemList.index(answers["res"])

    async def SelectItem(self, L1):
        itemsList = L1[0]["results"]
        for x, y in enumerate(itemsList, 1):
            print("({}) {}".format(x, y["title"]))
        with patch_stdout():
            insert = int(await self.session.prompt_async('Inserte>>: ', validator=NumberValidator(1, len(itemsList))))
        return itemsList[insert - 1]

    async def SelectItemSubItem(self, L2):
        itemListSub = L2[0]["results"]
        for x, y in enumerate(itemListSub, 1):
            print("({}) {}".format(x, y["title"]))
        with patch_stdout():
            insert = int(await self.session.prompt_async('Inserte>>: ', validator=NumberValidator(1, len(itemListSub))))
        return itemListSub[insert - 1]
