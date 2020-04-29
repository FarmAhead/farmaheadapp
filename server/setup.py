import os
import os.path as osp
from setuptools import setup, find_packages

loc = os.path.dirname(os.path.abspath(__file__))
name = 'farmahead'
src = 'src'

with open(osp.join(loc, 'requirements.txt')) as f:
    required = f.read().splitlines()

with open(osp.join(loc, src, name, '__version__.py'), encoding='utf-8') as version_file:
    exec(version_file.read())   # sources __version__

setup(
    version=__version__,
    name=name,
    author="@minelminel",
    url="https://github.com/FarmAhead/farmaheadapi",
    description="CodeBuffalo Hackathon 2020",
    install_requires=required,
    packages=find_packages(src),
    package_dir={"": src},
    entry_points={
        "console_scripts": [
            "farmahead=farmahead.__main__:main",
        ]
    }
)
