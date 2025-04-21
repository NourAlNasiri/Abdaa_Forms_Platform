// دالة طباعة النموذج
function printForm() {
    // منع السلوك الافتراضي للنموذج
    event.preventDefault();
    event.stopPropagation();
    
    // إنشاء نافذة طباعة جديدة
    const printWindow = window.open('', '_blank');
    
    // جمع البيانات من النموذج
    const formData = {
        personal: {
            fullName: document.getElementById('fullName').value,
            prostration: document.getElementById('Prostration').value,
            birthDate: `${document.querySelector('select[name="birthDay"]').value}/${document.querySelector('select[name="birthMonth"]').value}/${document.querySelector('input[name="birthYear"]').value}`,
            sex: document.getElementById('sex').value,
            maritalStatus: document.getElementById('marital-status').value
        },
        identity: {
            civilID: document.getElementById('civilID').value,
            province: document.querySelector('input[placeholder="اختر من القائمة المحافظة..."]').value,
            phone: document.getElementById('phoneNumber').value,
            email: document.querySelector('input[type="email"]').value
        },
        education: {
            educationLevel: document.getElementById('education').value,
            specialization: document.getElementById('specialization').value,
            college: document.getElementById('collegeName').value,
            graduationYear: document.getElementById('yearSelect').value
        }
    };

    // إنشاء محتوى صفحة الطباعة
    const printContent = `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
            <meta charset="UTF-8">
            <title>طباعة استمارة أبداع</title>
            <style>
                body {
                    font-family: 'Tajawal', Arial, sans-serif;
                    padding: 20px;
                    direction: rtl;
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .logo {
                    max-width: 150px;
                    margin-bottom: 10px;
                }
                .title {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .section {
                    margin-bottom: 20px;
                    border: 1px solid #ddd;
                    padding: 15px;
                }
                .section-title {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    color: #333;
                }
                .data-item {
                    margin-bottom: 10px;
                }
                .data-label {
                    font-weight: bold;
                    margin-left: 10px;
                }
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                }
                @media print {
                    body {
                        padding: 0;
                    }
                    .section {
                        break-inside: avoid;
                    }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <img src="img/شعار_وزارة_الاتصالات_العراقية.png" alt="شعار وزارة الاتصالات" class="logo">
                <div class="title">وزارة الاتصالات العراقية</div>
                <div class="subtitle">استمارة أبداع</div>
            </div>

            <div class="section">
                <div class="section-title">المعلومات الشخصية</div>
                <div class="data-item">
                    <span class="data-label">الاسم الكامل:</span>
                    <span>${formData.personal.fullName}</span>
                </div>
                <div class="data-item">
                    <span class="data-label">مجال التقديم:</span>
                    <span>${formData.personal.prostration}</span>
                </div>
                <div class="data-item">
                    <span class="data-label">تاريخ الميلاد:</span>
                    <span>${formData.personal.birthDate}</span>
                </div>
                <div class="data-item">
                    <span class="data-label">الجنس:</span>
                    <span>${formData.personal.sex}</span>
                </div>
                <div class="data-item">
                    <span class="data-label">الحالة الزوجية:</span>
                    <span>${formData.personal.maritalStatus}</span>
                </div>
            </div>

            <div class="section">
                <div class="section-title">معلومات الهوية والعنوان</div>
                <div class="data-item">
                    <span class="data-label">رقم البطاقة الموحدة:</span>
                    <span>${formData.identity.civilID}</span>
                </div>
                <div class="data-item">
                    <span class="data-label">المحافظة:</span>
                    <span>${formData.identity.province}</span>
                </div>
                <div class="data-item">
                    <span class="data-label">رقم الهاتف:</span>
                    <span>${formData.identity.phone}</span>
                </div>
                <div class="data-item">
                    <span class="data-label">البريد الإلكتروني:</span>
                    <span>${formData.identity.email || 'غير محدد'}</span>
                </div>
            </div>

            <div class="section">
                <div class="section-title">البيانات الدراسية</div>
                <div class="data-item">
                    <span class="data-label">التحصيل الدراسي:</span>
                    <span>${formData.education.educationLevel}</span>
                </div>
                <div class="data-item">
                    <span class="data-label">الاختصاص:</span>
                    <span>${formData.education.specialization}</span>
                </div>
                <div class="data-item">
                    <span class="data-label">اسم الكلية/الجامعة:</span>
                    <span>${formData.education.college}</span>
                </div>
                <div class="data-item">
                    <span class="data-label">سنة التخرج:</span>
                    <span>${formData.education.graduationYear}</span>
                </div>
            </div>

            <div class="footer">
                <p>جميع الحقوق محفوظة &copy; 2025 وزارة الاتصالات العراقية</p>
                <p>تم إنشاء هذه النسخة في: ${new Date().toLocaleString('ar-IQ')}</p>
            </div>
        </body>
        </html>
    `;

    // كتابة المحتوى في نافذة الطباعة
    printWindow.document.write(printContent);
    printWindow.document.close();

    // إضافة مستمع حدث لإغلاق النافذة عند إلغاء الطباعة
    printWindow.onafterprint = function() {
        printWindow.close();
    };

    // إضافة مستمع حدث لإغلاق النافذة عند الضغط على زر الإلغاء
    printWindow.onbeforeunload = function() {
        printWindow.close();
    };

    // انتظار تحميل الصور ثم طباعة
    printWindow.onload = function() {
        setTimeout(function() {
            printWindow.print();
        }, 500);
    };
    
    // منع إرسال النموذج
    return false;
} 