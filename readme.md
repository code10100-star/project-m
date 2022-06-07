# project-m

git clone git clone git@github com:code10100-star/project-m.git \
git checkout frontend \
source env/bin/activate 

# For backend (if virutual environment doesn't work)
pip install django  \
pip install django-cors-headers \
pip install djangorestframework 

# make migrations
python manage.py makemigratins\
python manage.py migrate

# For frontend
npm install \
npm start