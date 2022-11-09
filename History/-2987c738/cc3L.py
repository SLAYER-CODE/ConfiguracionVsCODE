from http import cookies
from logging import Logger


from calendar import c
from shutil import ExecError
from tkinter.tix import Select
# from typing_extensions import Self
import aiohttp
import json
from aiohttp.client import request
from aiohttp_socks import ProxyConnector, SocksConnector,ChainProxyConnector
from bs4 import BeautifulSoup,CData
import re
from numpy import append
from rx import create


# raise ExecError
from pygments import highlight, lexers, formatters
# from openpyxl import Workbook, load_workbook

# connector = ChainProxyConnector.from_urls([
#         'socks5://user:password@127.0.0.1:1080',
#         'socks4://127.0.0.1:1081',
#         'http://user:password@127.0.0.1:3128',
#     ])
class Connect:
    cookies = {}
    def __init__(self,gmail:str,password:str,name:str,logger:Logger):
        self.gmail = gmail.strip()
        self.password = password.strip()
        # conn = ProxyConnector(remote_resolve=False)
        # self.session = aiohttp.ClientSession(connector=connector)
        self.session = aiohttp.ClientSession()
        self.logger = logger
        self.username=name
    async def connection(self):
        burp0_url = "https://senati.blackboard.com:443/"
        burp0_headers = {"Connection": "close", "Upgrade-Insecure-Requests": "1", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", "Sec-Fetch-Site": "cross-site", "Sec-Fetch-Mode": "navigate", "Sec-Fetch-User": "?1", "Sec-Fetch-Dest": "document", "Referer": "https://www.google.com/", "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9"}
        async with self.session.get(burp0_url,headers=burp0_headers) as resp:
            assert resp.status == 200

        burp0_url = "https://senati.blackboard.com:443/webapps/privacy-disclosure/execute/consent?backURL=https%3A//senati.blackboard.com/&preview=false&blackboard.platform.security.NonceUtil.nonce=login"
        burp0_cookies = {"JSESSIONID": self.session.cookie_jar._cookies["senati.blackboard.com"]["JSESSIONID"].value, "AWSELB": self.session.cookie_jar._cookies["senati.blackboard.com"]["AWSELB"].value, "AWSELBCORS": self.session.cookie_jar._cookies["senati.blackboard.com"]["AWSELBCORS"].value, "BbRouter": self.session.cookie_jar._cookies["senati.blackboard.com"]["BbRouter"].value, "BbClientCalenderTimeZone": "America/Lima"}
        burp0_headers = {"Connection": "close", "Accept": "text/javascript, text/html, application/xml, text/xml, */*", "X-Prototype-Version": "1.7", "X-Requested-With": "XMLHttpRequest", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": "https://senati.blackboard.com/", "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9"}
        async with self.session.get(burp0_url,headers=burp0_headers,cookies=burp0_cookies) as resp:
            assert resp.status == 200
            self.logger.info("Obteniendo Primeras cokiees ".format(resp.cookies))
           

    async def initsessionPrevius(self):

        burp0_url = "https://senati.blackboard.com/auth-saml/saml/login?apId=_242_1&redirectUrl=https%3A%2F%2Fsenati.blackboard.com%2Fultra"
        burp0_cookies = {"BbClientCalenderTimeZone": "America/Lima", "JSESSIONID": self.session.cookie_jar._cookies["senati.blackboard.com"]["JSESSIONID"].value, "BbRouter":  self.session.cookie_jar._cookies["senati.blackboard.com"]["BbRouter"].value, "_ga": "GA1.2.1267852809.1634301288", "_gid": "GA1.2.83089956.1634301288",  "AWSELB": self.session.cookie_jar._cookies["senati.blackboard.com"]["AWSELB"].value, "AWSELBCORS":  self.session.cookie_jar._cookies["senati.blackboard.com"]["AWSELBCORS"].value, "COOKIE_CONSENT_ACCEPTED": "true"}
        burp0_headers = {"Connection": "close", "Upgrade-Insecure-Requests": "1", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "navigate", "Sec-Fetch-User": "?1", "Sec-Fetch-Dest": "document", "Referer": "https://senati.blackboard.com/", "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9"}
    
        self.logger.debug(self.session.cookie_jar._cookies["senati.blackboard.com"])
        async with self.session.get(burp0_url,headers=burp0_headers,cookies=burp0_cookies) as resp:
            assert resp.status == 200
            self.logger.debug(resp.cookies)
            # SAMLRequest = self.session.get(burp0_url, headers=burp0_headers, cookies=burp0_cookies)
            SAMLRequestRedirect = resp.history[0].headers["Location"]
            SAMLRequestLoad=(json.loads(BeautifulSoup(str(await resp.text()), "html.parser").find(text=re.compile("CDATA"))[20:-7]))
            
            self.logger.debug("SamLRequest:{} And Load {}".format(SAMLRequestRedirect,SAMLRequestLoad))

        burp0_url ="https://login.microsoftonline.com"+SAMLRequestLoad["urlPost"]
        burp0_cookies = {"fpc": self.session.cookie_jar._cookies["login.microsoftonline.com"]["fpc"].value, "x-ms-gateway-slice": "estsfd", "stsservicecookie": self.session.cookie_jar._cookies["login.microsoftonline.com"]["stsservicecookie"].value, "AADSSO": "NA|NoExtension", "SSOCOOKIEPULLED": "1"}
        burp0_headers = {"Connection": "close", "Upgrade-Insecure-Requests": "1", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "navigate", "Sec-Fetch-Dest": "document", "Referer": SAMLRequestRedirect, "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9"}
        async with self.session.get(burp0_url,headers=burp0_headers,cookies=burp0_cookies) as resp:
            assert resp.status == 200
            self.logger.debug(resp.cookies)
            soup = BeautifulSoup(str(await resp.text()), "html.parser")
            soupfinal=soup.find(text=re.compile("CDATA"))
            tokenJsonLoadInitflowToken=(json.loads(soupfinal[20:-7]))
            self.tokenJsonLoadInitflowToken=tokenJsonLoadInitflowToken
            self.logger.debug("Token Flow HTTP {}".format(tokenJsonLoadInitflowToken))

        burp0_url = "https://login.microsoftonline.com:443/common/GetCredentialType?mkt=es-ES"
    
        burp0_headers = {"Connection": "close", "hpgrequestid":tokenJsonLoadInitflowToken["sessionId"], "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36", "client-request-id": "1f3c6b63-e326-456e-8b2e-ee7ef8d8a255", "canary":tokenJsonLoadInitflowToken["apiCanary"], "Content-type": "application/json; charset=UTF-8", "hpgid": "1104", "Accept": "application/json", "hpgact": "1900", "Origin": "https://login.microsoftonline.com", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": "https://login.microsoftonline.com"+SAMLRequestLoad["urlPost"], "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9"}

        burp0_json={"checkPhones": True, "country": "PE", "federationFlags": 0, "flowToken": tokenJsonLoadInitflowToken["sFT"], "forceotclogin": False, "isAccessPassSupported": True, "isCookieBannerShown": False, "isExternalFederationDisallowed": False, "isFidoSupported": True, "isOtherIdpSupported": True, "isRemoteConnectSupported": False, "isRemoteNGCSupported": True, "isSignup": False, "originalRequest": tokenJsonLoadInitflowToken["sCtx"] , "username": self.gmail}

        async with self.session.post(burp0_url,json=burp0_json,headers=burp0_headers,cookies=self.session.cookie_jar._cookies["login.microsoftonline.com"]) as resp:
            assert resp.status == 200
            self.logger.debug(resp.cookies)
            ResGmailFinal=json.loads(await resp.text())
            ResGmailFinal
            self.logger.debug("Respuesta al iniciar el GMAIL {}".format(ResGmailFinal))

        burp0_url = "https://browser.events.data.microsoft.com:443/OneCollector/1.0/?cors=true&content-type=application/x-json-stream&client-id=NO_AUTH&client-version=1DS-Web-JS-2.3.4&apikey=69adc3c768bd4dc08c19416121249fcc-66f1668a-797b-4249-95e3-6c6651768c28-7293&upload-time=1634323057148&time-delta-to-apply-millis=use-collector-delta&w=0"
        burp0_headers = {"Connection": "close", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36", "Content-Type": "text/plain;charset=UTF-8", "Accept": "*/*", "Origin": "https://login.microsoftonline.com", "Sec-Fetch-Site": "cross-site", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": "https://login.microsoftonline.com/", "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9"}
        burp0_json={"data": {"baseData": {"properties": {"version": ""}}, "Data": "{\"pltMetrics\":{\"apiTimingInfo\":[],\"isPlt1\":false,\"plt\":2344,\"timing\":{\"connectStart\":1634322991326,\"navigationStart\":1634322991314,\"loadEventEnd\":1634322993670,\"domLoading\":1634322992743,\"secureConnectionStart\":0,\"fetchStart\":1634322991326,\"domContentLoadedEventStart\":1634322993617,\"responseStart\":1634322992737,\"responseEnd\":1634322992739,\"domInteractive\":1634322993617,\"domainLookupEnd\":1634322991326,\"redirectStart\":0,\"requestStart\":1634322991328,\"unloadEventEnd\":1634322992742,\"unloadEventStart\":1634322992742,\"domComplete\":1634322993619,\"domainLookupStart\":1634322991326,\"loadEventStart\":1634322993619,\"domContentLoadedEventEnd\":1634322993617,\"redirectEnd\":0,\"connectEnd\":1634322991326},\"pltOverallTransferBucket\":16,\"dns\":0,\"tcp\":0,\"pageSource\":\"LPerf\"}}", "PageName": "ConvergedSignIn", "ServerPageID": "1104", "ServiceID": "3", "viewId": 2}, "ext": {"app": {"name": "IDUX_ESTSClientTelemetryEvent_WebWatson", "sesId": "1f3c6b63-e326-456e-8b2e-ee7ef8d8a255", "userId": "p: 2000", "ver": "2.1.12108.11"}, "cloud": {"role": "SCUS", "roleInstance": "SN3XXXX", "roleVer": "2.1.12108.11"}, "metadata": {"f": {"viewId": {"t": 6}}}, "sdk": {"ver": "1DS-Web-JS-2.3.4"}}, "iKey": "o:69adc3c768bd4dc08c19416121249fcc", "name": "IDUX_ESTSClientTelemetryEvent_WebWatson", "time": "2021-10-15T18:37:34.136Z", "ver": "4.0"}
        async with self.session.post(burp0_url,headers=burp0_headers,json=burp0_json) as resp:
            self.logger.debug(resp.cookies)

    async def initRootSession(self):
        self.logger.info("Iniciando Session")
        burp0_url = self.tokenJsonLoadInitflowToken["urlPost"]
        burp0_cookies = {"x-ms-gateway-slice": self.session.cookie_jar._cookies["login.microsoftonline.com"]["x-ms-gateway-slice"].value, "stsservicecookie": "estsfd", "AADSSO": "NA|NoExtension", "esctx":self.session.cookie_jar._cookies["login.microsoftonline.com"]["esctx"].value, "brcap": "0", "buid": self.session.cookie_jar._cookies["login.microsoftonline.com"]["buid"].value, "fpc": self.session.cookie_jar._cookies["login.microsoftonline.com"]["fpc"].value, "clrc": "{%2218916%22%3a[%220b9gVZOA%22%2c%22hVrkrE7O%22]}","MSFPC": self.session.cookie_jar._cookies["microsoft.com"]["MC1"].value, "wlidperf": "FR=L&ST=1634323333312"}

        burp0_headers = {"Connection": "close", "Cache-Control": "max-age=0", "Upgrade-Insecure-Requests": "1", "Origin": "https://login.microsoftonline.com", "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "navigate", "Sec-Fetch-User": "?1", "Sec-Fetch-Dest": "document", "Referer": self.tokenJsonLoadInitflowToken["urlPost"], "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9"}
        burp0_data = {"i13": "0", "login": self.gmail, "loginfmt": self.gmail, "type": "11", "LoginOptions": "3", "lrt": '', "lrtPartition": '', "hisRegion": '', "hisScaleUnit": '', "passwd": self.password, "ps": "2", "psRNGCDefaultType": '', "psRNGCEntropy": '', "psRNGCSLK": '', "canary": self.tokenJsonLoadInitflowToken["canary"], "ctx":self.tokenJsonLoadInitflowToken["sCtx"], "hpgrequestid":self.tokenJsonLoadInitflowToken["sessionId"], "flowToken": self.tokenJsonLoadInitflowToken["sFT"], "PPSX": '', "NewUser": "1", "FoundMSAs": '', "fspost": "0", "i21": "0", "CookieDisclosure": "0", "IsFidoSupported": "1", "isSignupPost": "0", "i2": "1", "i17": '', "i18": '', "i19": "339643"}
        self.logger.info("Data Send {}".format(burp0_data))
        while True:
            async with self.session.post(burp0_url,headers=burp0_headers,data=burp0_data,cookies=burp0_cookies) as resp:
                assert resp.status == 200
                self.logger.debug("Al iniciar la conexion Cuenta {} {}".format(self.gmail,resp.cookies))
                inicionsession=await resp.text()
                if(not "ESTSAUTH" in resp.cookies.keys()):
                    self.logger.warning("Se reguistro correctamente ubicando los errores...")
                    if(inicionsession.find("mantener") != -1):
                        self.logger.critical("Si inicio correctamente pero no reguistro las cokies intentando nuevamante...")
                        continue
                    elif(inicionsession.find("recuerda") != -1):
                        self.logger.critical("La contraseña es incorrecta!! Retirando Usuario...")
                        return None
                    elif(inicionsession.find("bloqueado") != -1):
                        self.logger.critical("Inicio de session bloqueado púede deberse a que la cuenta no esta reguistrada o no esta activada o que se espero mucho el tiempo de espera")
                        return None
                    else:
                        self.logger.critical("No se ubico el error, Inspeccionado...")
                        self.logger.info(inicionsession)
                        return None
                        
                self.bbrouterindex=dict([x.split(":") for x in self.session.cookie_jar._cookies["senati.blackboard.com"]["BbRouter"].value.split(",") ] )
                self.logger.debug("Imprimiendo el index de brouter en las cokiies {}".format(self.bbrouterindex))
                break



        self.logger.info("Redirijiento y obteniendo credenciales ... ")

        burp0_url = "https://senati.blackboard.com:443/auth-saml/saml/login?apId=_242_1&redirectUrl=https%3A%2F%2Fsenati.blackboard.com%2Fultra"
        burp0_cookies = {"JSESSIONID": self.session.cookie_jar._cookies["senati.blackboard.com"]["JSESSIONID"].value, "BbClientCalenderTimeZone": "America/Lima", "_ga": "GA1.2.1015695736.1634337120", "_gid": "GA1.2.810803460.1634337120", "COOKIE_CONSENT_ACCEPTED": "true", "AWSELB":self.session.cookie_jar._cookies["senati.blackboard.com"]["AWSELB"].value, "AWSELBCORS": self.session.cookie_jar._cookies["senati.blackboard.com"]["AWSELBCORS"].value, "BbRouter": self.session.cookie_jar._cookies["senati.blackboard.com"]["BbRouter"].value, "_gat_gtag_UA_84289107_3": "1", "JSESSIONID": self.session.cookie_jar._cookies["senati.blackboard.com"]["JSESSIONID"].value}
        
        burp0_headers = {"Connection": "close", "Upgrade-Insecure-Requests": "1", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "navigate", "Sec-Fetch-User": "?1", "Sec-Fetch-Dest": "document", "Referer": "https://senati.blackboard.com/", "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9"}

        self.logger.info("Cokiies para la obtencion de datos {}".format(self.session.cookie_jar._cookies["senati.blackboard.com"]))
        async with self.session.get(burp0_url,headers=burp0_headers,cookies=burp0_cookies) as resp:
            assert resp.status == 200
            self.logger.debug("Reguistrando Autenticaciones... {}".format(resp.cookies))
            self.RedirectUltra=resp
    
        self.logger.info("Iniciando con credenciales... USER {}".format(self.gmail))
        self.logger.critical(self.session.cookie_jar._cookies["login.microsoftonline.com"])

        burp0_url = self.RedirectUltra.history[0].headers["Location"]
        burp0_cookies = {"x-ms-gateway-slice": "estsfd", "stsservicecookie": "estsfd", "AADSSO": "NA|NoExtension", "esctx": self.session.cookie_jar._cookies["login.microsoftonline.com"]["esctx"].value, "brcap": "0", "wlidperf": "FR=L&ST=1634431840371", "ESTSAUTHLIGHT": self.session.cookie_jar._cookies["login.microsoftonline.com"]["ESTSAUTHLIGHT"].value, "ESTSSC":self.session.cookie_jar._cookies["login.microsoftonline.com"]["ESTSSC"].value, "ESTSAUTHPERSISTENT": self.session.cookie_jar._cookies["login.microsoftonline.com"]["ESTSAUTHPERSISTENT"].value, "ESTSAUTH":self.session.cookie_jar._cookies["login.microsoftonline.com"]["ESTSAUTH"].value, "ch": self.session.cookie_jar._cookies["login.microsoftonline.com"]["ch"].value, "fpc": self.session.cookie_jar._cookies["login.microsoftonline.com"]["fpc"].value,"clrc": "{%2218917%22%3a[%22NKuhto9Z%22%2c%22YMcTWH6J%22%2c%22mQE/hwuc%22]}"}

        burp0_headers = {"Upgrade-Insecure-Requests": "1", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", "Sec-Fetch-Site": "cross-site", "Sec-Fetch-Mode": "navigate", "Sec-Fetch-User": "?1", "Sec-Fetch-Dest": "document", "Sec-Ch-Ua": "\";Not A Brand\";v=\"99\", \"Chromium\";v=\"94\"", "Sec-Ch-Ua-Mobile": "?0", "Sec-Ch-Ua-Platform": "\"Windows\"", "Referer": "https://senati.blackboard.com/", "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9", "Connection": "close"}
        async with self.session.get(burp0_url,headers=burp0_headers,cookies=burp0_cookies) as resp:
            self.logger.info("STATUS INIT LOCATION MICROSOFT URL {}".format(resp.status))
            assert resp.status == 200
            self.logger.debug(resp.cookies)
            # final=self.session.get(burp0_url, headers=burp0_headers, cookies=burp0_cookies)
            soup=BeautifulSoup(await resp.text(),"html.parser")
            Formulario=soup.find("input")
            self.FinalFormSmpal=Formulario.get("value")

        burp0_url = "https://senati.blackboard.com:443/auth-saml/saml/SSO/alias/_242_1"
        burp0_headers = {"Connection": "close", "Cache-Control": "max-age=0", "Upgrade-Insecure-Requests": "1", "Origin": "https://login.microsoftonline.com", "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", "Sec-Fetch-Site": "cross-site", "Sec-Fetch-Mode": "navigate", "Sec-Fetch-Dest": "document", "Referer": "https://login.microsoftonline.com/", "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9"}
        burp0_cookies = {"JSESSIONID": self.session.cookie_jar._cookies["senati.blackboard.com"]["JSESSIONID"].value, "AWSELBCORS": self.session.cookie_jar._cookies["senati.blackboard.com"]["AWSELBCORS"].value}
        burp0_data = {"SAMLResponse":Formulario.get("value")}
        async with self.session.post(burp0_url,headers=burp0_headers,data=burp0_data) as resp:
            assert resp.status == 200
            self.logger.debug(resp.cookies)
            self.RedirectUltra=resp
            self.crokies=resp.cookies

        await self.UserDell()
        return self


    async def UserDell(self):
        burp0_url = "https://senati.blackboard.com:443/learn/api/v1/users/me"
        burp0_headers = {"X-Blackboard-Xsrf": self.bbrouterindex["xsrf"], "Accept": "application/json, text/plain, */*", "Sec-Ch-Ua-Mobile": "?0", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36", "Sec-Ch-Ua": "\";Not A Brand\";v=\"99\", \"Chromium\";v=\"94\"", "Sec-Ch-Ua-Platform": "\"Windows\"", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": "https://senati.blackboard.com/ultra/course", "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9", "Connection": "close"}
        # session.get(burp0_url, headers=burp0_headers, cookies=burp0_cookies)
        async with self.session.get(burp0_url,headers=burp0_headers,cookies=self.session.cookie_jar._cookies["senati.blackboard.com"]) as resp:
            UserDell=json.loads(await resp.text())
            self.userDetalles=UserDell
            self.userID=str(self.userDetalles.get("id"))
        return(UserDell)

    async def extractCurses(self):        
        self.bbrouterindex=dict([x.split(":") for x in self.session.cookie_jar._cookies["senati.blackboard.com"]["BbRouter"].value.split(",") ] )
        burp0_url = "https://senati.blackboard.com:443/learn/api/v1/users/"+self.userID+"/memberships?expand=course.effectiveAvailability,course.permissions,courseRole&includeCount=true&limit=10000"        # params = {"expand":"course.effectiveAvailability,course.permissions,courseRole","includeCount":"true","limit":"10000"}
        burp0_cookies = {"JSESSIONID":self.session.cookie_jar._cookies["senati.blackboard.com"]["JSESSIONID"].value, "_ga": "GA1.2.1649868462.1634421450", "_gid": "GA1.2.1305288680.1634421450", "COOKIE_CONSENT_ACCEPTED": "true", "BbClientCalenderTimeZone": "America/Lima", "JSESSIONID": self.session.cookie_jar._cookies["senati.blackboard.com"]["JSESSIONID"].value, "AWSELB": self.session.cookie_jar._cookies["senati.blackboard.com"]["AWSELB"].value, "AWSELBCORS": self.session.cookie_jar._cookies["senati.blackboard.com"]["AWSELBCORS"].value, "BbRouter":self.session.cookie_jar._cookies["senati.blackboard.com"]["BbRouter"].value}
        
        burp0_headers = {"X-Blackboard-Xsrf": self.bbrouterindex["xsrf"], "Accept": "application/json, text/plain, */*", "Sec-Ch-Ua-Mobile": "?0", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36", "Sec-Ch-Ua": "\";Not A Brand\";v=\"99\", \"Chromium\";v=\"94\"", "Sec-Ch-Ua-Platform": "\"Windows\"", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": "https://senati.blackboard.com/ultra/", "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9", "Connection": "close"}
                 
        # cursosUser=self.session.get(burp0_url, headers=burp0_headers, cookies=burp0_cookies)
        async with self.session.get(burp0_url,headers=burp0_headers,cookies=self.session.cookie_jar._cookies["senati.blackboard.com"]) as resp:
            AllCursesUser=json.loads(await resp.text())
        self.AllCursesUser=AllCursesUser
        return(AllCursesUser)

  
    ##AL REALIZAR CLICK DENTRO DE LOS CUADRODS DE LOS CURSOS
    async def CurseDell(self,idCurse):
        burp0_url = "https://senati.blackboard.com:443/learn/api/v1/courses/"+idCurse
        
        burp0_headers = {"X-Blackboard-Xsrf": self.bbrouterindex["xsrf"], "Sec-Ch-Ua-Mobile": "?0", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36", "Sec-Ch-Ua-Platform": "\"Windows\"", "Sec-Ch-Ua": "\";Not A Brand\";v=\"99\", \"Chromium\";v=\"94\"", "Accept": "*/*", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": "https://senati.blackboard.com/ultra/courses/"+idCurse+"/outline", "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9", "Connection": "close"}
        async with self.session.get(burp0_url,headers=burp0_headers,cookies=self.session.cookie_jar._cookies["senati.blackboard.com"]) as resp:
            AllCursesUser=json.loads(await resp.text())
            return(AllCursesUser)

    async def selectCurseDell(self,idCurse):
        burp0_url = "https://senati.blackboard.com:443/learn/api/v1/courses/"+idCurse+"?expand=instructorsMembership,+instructorsMembership.courseRole,+effectiveAvailability,+isChild"
        burp0_headers = {"X-Blackboard-Xsrf": self.bbrouterindex["xsrf"], "Accept": "application/json, text/plain, */*", "Sec-Ch-Ua-Mobile": "?0", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36", "Sec-Ch-Ua": "\";Not A Brand\";v=\"99\", \"Chromium\";v=\"94\"", "Sec-Ch-Ua-Platform": "\"Windows\"", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": "https://senati.blackboard.com/ultra/course", "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9", "Connection": "close"}
        async with self.session.get(burp0_url,headers=burp0_headers,cookies=self.session.cookie_jar._cookies["senati.blackboard.com"]) as resp:
            DetallesCurse=json.loads(await resp.text())
        return(DetallesCurse)

    async def selectCurseDellUser(self,idCurse):
        burp0_url = "https://senati.blackboard.com:443/learn/api/v1/courses/"+idCurse+"/users/"+self.userID+"?expand=courseRole"
        burp0_headers = {"X-Blackboard-Xsrf": self.bbrouterindex["xsrf"], "Accept": "application/json, text/plain, */*", "Sec-Ch-Ua-Mobile": "?0", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36", "Sec-Ch-Ua": "\";Not A Brand\";v=\"99\", \"Chromium\";v=\"94\"", "Sec-Ch-Ua-Platform": "\"Windows\"", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": "https://senati.blackboard.com/ultra/course", "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9", "Connection": "close"}
        async with self.session.get(burp0_url,headers=burp0_headers,cookies=self.session.cookie_jar._cookies["senati.blackboard.com"]) as resp:
            DetallesCurseUser=json.loads(await resp.text())
        return(DetallesCurseUser)

    async def selectCurseDellRoot(self,idCurse):
        burp0_url = "https://senati.blackboard.com:443/learn/api/v1/courses/"+idCurse+"/contents/ROOT"
        burp0_headers = {"X-Blackboard-Xsrf": self.bbrouterindex["xsrf"], "Accept": "application/json, text/plain, */*", "Sec-Ch-Ua-Mobile": "?0", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36", "Sec-Ch-Ua": "\";Not A Brand\";v=\"99\", \"Chromium\";v=\"94\"", "Sec-Ch-Ua-Platform": "\"Windows\"", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": "https://senati.blackboard.com/ultra/courses/"+idCurse+"/outline", "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9", "Connection": "close"}
        async with self.session.get(burp0_url,headers=burp0_headers,cookies=self.session.cookie_jar._cookies["senati.blackboard.com"]) as resp:
            DetallesCurseRoot=json.loads(await resp.text())
        return(DetallesCurseRoot)
        # session.get(burp0_url, headers=burp0_headers, cookies=burp0_cookies)
    #EXTRAERO CONTENIDO DEL CURSO LINKS DIRECIONES Y TODO
    async def GetContentCurse(self,idCurse):
        burp0_url = "https://senati.blackboard.com:443/learn/api/v1/courses/"+idCurse+"/contents/ROOT/children?@view=Summary&expand=assignedGroups,selfEnrollmentGroups.group,gradebookCategory&limit=1000"
        burp0_headers = {"X-Blackboard-Xsrf": self.bbrouterindex["xsrf"], "Accept": "application/json, text/plain, */*", "Sec-Ch-Ua-Mobile": "?0", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36", "Sec-Ch-Ua": "\";Not A Brand\";v=\"99\", \"Chromium\";v=\"94\"", "Sec-Ch-Ua-Platform": "\"Windows\"", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": "https://senati.blackboard.com/ultra/courses/"+idCurse+"/outline", "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9", "Connection": "close"}
        async with self.session.get(burp0_url,headers=burp0_headers,cookies=self.session.cookie_jar._cookies["senati.blackboard.com"]) as resp:
            getContentCurse=json.loads(await resp.text())
        return(getContentCurse)

    #EXTRAER INFORMACION DE TODOS LOS CURSOS USUARIOS TODOS
    async def extractUserCurse(self,idCurse):
        self.bbrouterindex=dict([x.split(":") for x in self.session.cookie_jar._cookies["senati.blackboard.com"]["BbRouter"].value.split(",") ] )

        burp0_url = "https://senati.blackboard.com:443/learn/api/v1/utilities/batch?xb=1"
        burp0_headers = {"X-Blackboard-Xsrf": self.bbrouterindex["xsrf"], "Accept": "application/json, text/plain, */*", "Sec-Ch-Ua-Mobile": "?0", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36", "Sec-Ch-Ua": "\";Not A Brand\";v=\"99\", \"Chromium\";v=\"94\"", "Sec-Ch-Ua-Platform": "\"Windows\"", "Content-Type": "application/json;charset=UTF-8", "Origin": "https://senati.blackboard.com", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": "https://senati.blackboard.com/ultra/course", "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9", "Connection": "close"}
        burp0_json=[{"method": "GET", "relativeUrl": "v1/courses/"+idCurse+"/memberships?roleBucket=TAKING?expand=user&limit=10000?expand?'"}]
        async with self.session.put(burp0_url,headers=burp0_headers,json=burp0_json,cookies=self.session.cookie_jar._cookies["senati.blackboard.com"]) as resp:
            UserCurse=json.loads(await resp.text())
        return UserCurse
        # session.put(burp0_url, headers=burp0_headers, cookies=burp0_cookies, json=burp0_json)
    async def extractTeachersCurse(self,idCurse):
        self.bbrouterindex=dict([x.split(":") for x in self.session.cookie_jar._cookies["senati.blackboard.com"]["BbRouter"].value.split(",") ] )

        burp0_url = "https://senati.blackboard.com:443/learn/api/v1/utilities/batch?xb=1"
        
        burp0_headers = {"X-Blackboard-Xsrf": self.bbrouterindex["xsrf"], "Accept": "application/json, text/plain, */*", "Sec-Ch-Ua-Mobile": "?0", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36", "Sec-Ch-Ua": "\";Not A Brand\";v=\"99\", \"Chromium\";v=\"94\"", "Sec-Ch-Ua-Platform": "\"Windows\"", "Content-Type": "application/json;charset=UTF-8", "Origin": "https://senati.blackboard.com", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": "https://senati.blackboard.com/ultra/course", "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9", "Connection": "close"}
        burp0_json=[{"method": "GET", "relativeUrl": "v1/courses/"+idCurse+"/memberships?roleBucket=TEACHING?expand=user&limit=10000&isExcludedFromCourseUserActivity=False&includeCount=true"}]

        async with self.session.put(burp0_url,headers=burp0_headers,json=burp0_json,cookies=self.session.cookie_jar._cookies["senati.blackboard.com"]) as resp:
            TeachersCurse=json.loads(await resp.text())
            print(TeachersCurse)
        

    async def extractUsersAllCurses(self):
        burp0_url = "https://senati.blackboard.com:443/learn/api/v1/utilities/batch?xb=1"
        burp0_headers = {"X-Blackboard-Xsrf": self.bbrouterindex["xsrf"], "Accept": "application/json, text/plain, */*", "Sec-Ch-Ua-Mobile": "?0", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36", "Sec-Ch-Ua": "\";Not A Brand\";v=\"99\", \"Chromium\";v=\"94\"", "Sec-Ch-Ua-Platform": "\"Windows\"", "Content-Type": "application/json;charset=UTF-8", "Origin": "https://senati.blackboard.com", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": "https://senati.blackboard.com/ultra/course", "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9", "Connection": "close"}
        burp0_json=[{"method": "GET", "relativeUrl": "v1/courses/"+x["course"]["id"]+"/memberships?roleBucket=TAKING?expand=user&limit=10000&isExcludedFromCourseUserActivity=False&includeCount=true"} for x in self.AllCursesUser["results"]]

        async with self.session.put(burp0_url,headers=burp0_headers,json=burp0_json,cookies=self.session.cookie_jar._cookies["senati.blackboard.com"]) as resp:
            TeachersCurse=json.loads(await resp.text())
            print(TeachersCurse)
            
    async def extractTeachersAllCurses(self):

        burp0_url = "https://senati.blackboard.com:443/learn/api/v1/utilities/batch?xb=1"
        
        burp0_headers = {"X-Blackboard-Xsrf": self.bbrouterindex["xsrf"], "Accept": "application/json, text/plain, */*", "Sec-Ch-Ua-Mobile": "?0", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36", "Sec-Ch-Ua": "\";Not A Brand\";v=\"99\", \"Chromium\";v=\"94\"", "Sec-Ch-Ua-Platform": "\"Windows\"", "Content-Type": "application/json;charset=UTF-8", "Origin": "https://senati.blackboard.com", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": "https://senati.blackboard.com/ultra/course", "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9", "Connection": "close"}
        burp0_json=[{"method": "GET", "relativeUrl": "v1/courses/"+x["course"]["id"]+"/memberships?roleBucket=TEACHING?expand=user&limit=10000&isExcludedFromCourseUserActivity=False&includeCount=true"} for x in self.AllCursesUser["results"]]

        async with self.session.put(burp0_url,headers=burp0_headers,json=burp0_json,cookies=self.session.cookie_jar._cookies["senati.blackboard.com"]) as resp:
            TeachersCurse=json.loads(await resp.text())
            print(TeachersCurse)

    async def selectItemCurseAction(self,curse,item):
        burp0_url = "https://senati.blackboard.com:443/learn/api/v1/courses/"+curse+"/contents/"+item+"/children?@view=Summary&expand=assignedGroups,selfEnrollmentGroups.group,gradebookCategory&limit=10"
        burp0_headers = {"X-Blackboard-Xsrf":  self.bbrouterindex["xsrf"], "Accept": "application/json, text/plain, */*", "Sec-Ch-Ua-Mobile": "?0", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36", "Sec-Ch-Ua": "\";Not A Brand\";v=\"99\", \"Chromium\";v=\"94\"", "Sec-Ch-Ua-Platform": "\"Windows\"", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": "https://senati.blackboard.com/ultra/courses/"+curse+"/outline", "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9", "Connection": "close"}
        async with self.session.get(burp0_url, headers=burp0_headers,cookies=self.session.cookie_jar._cookies["senati.blackboard.com"])as resp:
            selectItemCurseActionGet=json.loads(await resp.text())
            formaterjson=json.dumps(selectItemCurseActionGet,indent=2)
            self.logger.debug(highlight(formaterjson, lexers.JsonLexer(), formatters.TerminalFormatter()))
        return selectItemCurseActionGet
    
    #item 3370
    async def selectItemCurseActionItem(self,curse,seconditem):
        burp0_url = "https://senati.blackboard.com:443/learn/api/v1/courses/"+curse+"/contents/"+seconditem+"?expand=assignedGroups,selfEnrollmentGroups.group,alignedGoals,gradebookCategory"
        burp0_headers = {"X-Blackboard-Xsrf": self.bbrouterindex["xsrf"], "Accept": "application/json, text/plain, */*", "Sec-Ch-Ua-Mobile": "?0", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36", "Sec-Ch-Ua": "\";Not A Brand\";v=\"99\", \"Chromium\";v=\"94\"", "Sec-Ch-Ua-Platform": "\"Windows\"", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": "https://senati.blackboard.com/ultra/courses/"+curse+"/outline", "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9", "Connection": "close"}
        async with self.session.get(burp0_url, headers=burp0_headers,cookies=self.session.cookie_jar._cookies["senati.blackboard.com"])as resp:
            selectItemCurseActionGetItem=json.loads(await resp.text())
            formaterjson=json.dumps(selectItemCurseActionGetItem,indent=2)
            self.logger.debug(highlight(formaterjson, lexers.JsonLexer(), formatters.TerminalFormatter()))
        return selectItemCurseActionGetItem

    #item 3372
    async def detCurseSelectItem(self,url):
        burp0_headers = {"X-Blackboard-Xsrf":self.bbrouterindex["xsrf"], "Accept": "application/json, text/plain, */*", "Sec-Ch-Ua-Mobile": "?0", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36", "Sec-Ch-Ua": "\";Not A Brand\";v=\"99\", \"Chromium\";v=\"94\"", "Sec-Ch-Ua-Platform": "\"Windows\"", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": url, "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9", "Connection": "close"}
        async with self.session.get(url, headers=burp0_headers,cookies=self.session.cookie_jar._cookies["senati.blackboard.com"])as resp:
            detCurseSelectItemExamen=json.loads(await resp.text())
            formaterjson=json.dumps(detCurseSelectItemExamen,indent=2)
            self.logger.debug(highlight(formaterjson, lexers.JsonLexer(), formatters.TerminalFormatter()))
            return detCurseSelectItemExamen   
    async def getExamenGeneral(self,curse,column):
   
        burp0_url = "https://senati.blackboard.com:443/learn/api/v1/courses/"+curse+"/gradebook/columns/"+column+"/grades?expand=attemptsLeft&userId="+self.userID

        burp0_headers = {"X-Blackboard-Xsrf":self.bbrouterindex["xsrf"],"Accept": "application/json, text/plain, */*", "Sec-Ch-Ua-Mobile": "?0", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36", "Sec-Ch-Ua": "\";Not A Brand\";v=\"99\", \"Chromium\";v=\"94\"", "Sec-Ch-Ua-Platform": "\"Windows\"", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": "https://senati.blackboard.com/ultra/courses/"+curse+"/outline", "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9", "Connection": "close"}
        async with self.session.get(burp0_url, headers=burp0_headers,cookies=self.session.cookie_jar._cookies["senati.blackboard.com"])as resp:
            
            getExamenGeneral=json.loads(await resp.text())
            formaterjson=json.dumps(getExamenGeneral,indent=2)
            self.logger.debug("User {} Id User {} Json \n {}".format(self.gmail,self.userID,highlight(formaterjson, lexers.JsonLexer(), formatters.TerminalFormatter())) )
            if(resp.status==404):
                return None
            return getExamenGeneral   

    # id 4727
    async def getExamenIntentsStatus(self,curse,columns,grades):
        burp0_url = "https://senati.blackboard.com:443/learn/api/v1/courses/"+curse+"/gradebook/columns/"+columns+"/grades/"+grades+"/attempts?fields=id,status,attemptDate"
        burp0_headers = {"X-Blackboard-Xsrf": self.bbrouterindex["xsrf"], "Accept": "application/json, text/plain, */*", "Sec-Ch-Ua-Mobile": "?0", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36", "Sec-Ch-Ua": "\";Not A Brand\";v=\"99\", \"Chromium\";v=\"94\"", "Sec-Ch-Ua-Platform": "\"Windows\"", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": "https://senati.blackboard.com/ultra/courses/"+curse+"/outline/assessment/_9672235_1/overview/attempt/_21982189_1?courseId="+curse, "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9", "Connection": "close"}
        # session.get(burp0_url, headers=burp0_headers, cookies=burp0_cookies)
        async with self.session.get(burp0_url, headers=burp0_headers,cookies=self.session.cookie_jar._cookies["senati.blackboard.com"])as resp:
            getExamenIntentsStatus=json.loads(await resp.text())
            print(getExamenIntentsStatus)
            return getExamenIntentsStatus   

    async def getExamenIntentsStatus(self,curse,columns,grades):
        burp0_url = "https://senati.blackboard.com:443/learn/api/v1/courses/"+curse+"/gradebook/columns/"+columns+"/grades/"+grades+"/attempts?fields=id,status,attemptDate"
        burp0_headers = {"X-Blackboard-Xsrf": self.bbrouterindex["xsrf"], "Accept": "application/json, text/plain, */*", "Sec-Ch-Ua-Mobile": "?0", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36", "Sec-Ch-Ua": "\";Not A Brand\";v=\"99\", \"Chromium\";v=\"94\"", "Sec-Ch-Ua-Platform": "\"Windows\"", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": "https://senati.blackboard.com/ultra/courses/"+curse+"/outline/assessment/_9672235_1/overview/attempt/_21982189_1?courseId="+curse, "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9", "Connection": "close"}
        # session.get(burp0_url, headers=burp0_headers, cookies=burp0_cookies)
        async with self.session.get(burp0_url, headers=burp0_headers,cookies=self.session.cookie_jar._cookies["senati.blackboard.com"])as resp:
            getExamenIntentsStatus=json.loads(await resp.text())
            print(getExamenIntentsStatus)
            return getExamenIntentsStatus   
            
    async def getAllIntentsExamDell(self,curse,columns,grades):
 
        burp0_url = "https://senati.blackboard.com:443/learn/api/v1/courses/"+curse+"/gradebook/columns/"+columns+"/grades/"+grades+"/attempts?expand=toolAttemptDetail"

        burp0_headers = {"X-Blackboard-Xsrf": self.bbrouterindex["xsrf"], "Accept": "application/json, text/plain, */*", "Sec-Ch-Ua-Mobile": "?0", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36", "Sec-Ch-Ua": "\";Not A Brand\";v=\"99\", \"Chromium\";v=\"94\"", "Sec-Ch-Ua-Platform": "\"Windows\"", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": "https://senati.blackboard.com/ultra/courses/"+curse+"/outline/assessment/_9672235_1/overview?courseId="+curse, "Accept-Encoding": "gzip, deflate", "Accept-Language": "es-ES,es;q=0.9", "Connection": "close"}
        # session.get(burp0_url, headers=burp0_headers, cookies=burp0_cookies)

        # session.get(burp0_url, headers=burp0_headers, cookies=burp0_cookies)

        async with self.session.get(burp0_url, headers=burp0_headers,cookies=self.session.cookie_jar._cookies["senati.blackboard.com"])as resp:
            getAllIntentsExamDell=json.loads(await resp.text())
            formaterjson=json.dumps(getAllIntentsExamDell,indent=2)
            self.logger.debug(highlight(formaterjson, lexers.JsonLexer(), formatters.TerminalFormatter()))
            self.ExamDell = getAllIntentsExamDell 
        return self 


