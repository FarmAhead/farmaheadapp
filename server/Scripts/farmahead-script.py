#!c:\users\corwy\desktop\farmaheadapp\server\scripts\python.exe
# EASY-INSTALL-ENTRY-SCRIPT: 'farmahead','console_scripts','farmahead'
__requires__ = 'farmahead'
import re
import sys
from pkg_resources import load_entry_point

if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw?|\.exe)?$', '', sys.argv[0])
    sys.exit(
        load_entry_point('farmahead', 'console_scripts', 'farmahead')()
    )
