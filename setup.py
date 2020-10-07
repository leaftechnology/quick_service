# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in quick_service/__init__.py
from quick_service import __version__ as version

setup(
	name='quick_service',
	version=version,
	description='Quick Service',
	author='jan',
	author_email='janlloydangeles@gmail.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
