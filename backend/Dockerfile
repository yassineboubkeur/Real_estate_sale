# اختيار صورة الأساس
FROM node:22.3.0

# تحديد الدليل العمل داخل الحاوية
WORKDIR /backend

# نسخ ملفات الـ package الخاصة بـ Node.js
COPY package*.json ./  

# تثبيت التبعيات
RUN npm install

# تثبيت nodemon كـ dependency تطويرية
RUN npm install -g nodemon

# نسخ باقي الملفات للمجلد العمل
COPY . ./  

# تشغيل التطبيق باستخدام nodemon
CMD ["npm", "run", "dev"]
