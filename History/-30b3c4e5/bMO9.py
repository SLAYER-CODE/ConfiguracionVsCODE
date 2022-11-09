import os
import win32com.client


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

    __DLL_SH = win32com.client.gencache.EnsureDispatch('Shell.Application', 0)

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


class metaobject(type):
    def num_getter(cls):
        print("Conteo de Examenes")
        return cls._num

    def num_setter(cls, value):
        cls._num = value
        print("Contador Modificado")
    num = property(num_getter, num_setter)


class Cuenta(object):
    def __init__(self, email, password):
        self.email = email
        self.password = password


class Usuario(Cuenta):
    def __init__(self, cuenta: Cuenta = Cuenta("unknow@gmail.com", "")):
        super().__init__(cuenta.email, cuenta.password)


class AnalisisPrev(Usuario):
    def __init__(self, cuenta: Cuenta):
        super().__init__(cuenta)


class Examen(Usuario, object, metaclass=metaobject):
    _num = 0

    def __new__(cls, *args, **kwargs):
        print("Se creo el objeto")
        cls._num += 1
        return super(Examen).__new__(cls, *args, **kwargs)

    def __init__(self, cuenta: Cuenta):
        super().__init__(cuenta)
        pass

    def __lt__(self, other):
        pass

    def __gt__(self, other):
        pass

    def __le__(self, other):
        pass

    def __ge__(self, other):
        pass

    def __ne__(self, other):
        pass

    def __eq__(self, other):
        pass

    @classmethod
    def correct(other):
        print(other)

    # @staticmethod
    # def createExamen(cls,notas:list):


class AnalisisAll():
    def __init__(self, notas: list):

        pass

    def _getCorect(self):
        pass


class grapdataset(object):
    pass
