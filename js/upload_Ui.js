/**
 * ملف واجهة رفع الملفات
 * يتيح للمستخدم رفع ملفات PDF وعرض تقدم العملية
 */

// تعريف العناصر في واجهة المستخدم
const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('fileInput');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');
const progressText = document.getElementById('progressText');
const fileInfo = document.getElementById('fileInfo');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

// إعداد مستمعي الأحداث للتفاعل مع المستخدم
uploadBox.addEventListener('click', () => fileInput.click());

uploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadBox.classList.add('dragover');
});

uploadBox.addEventListener('dragleave', () => uploadBox.classList.remove('dragover'));

uploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadBox.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', () => handleFiles(fileInput.files));

/**
 * معالجة الملفات المرفوعة
 * @param {FileList} files - قائمة الملفات المرفوعة
 */
function handleFiles(files) {
    // التحقق من وجود ملفات
    if (files.length === 0) return;
    
    // إعادة تعيين واجهة المستخدم
    resetUI();
    
    // التحقق من صحة الملفات
    const { validFiles, hasError, errorMessage: errorMsg } = validateFiles(files);
    
    if (hasError) {
        showError(errorMsg);
        return;
    }
    
    if (validFiles.length === 0) return;
    
    // عرض معلومات الملفات
    displayFileInfo(validFiles);
    
    // بدء عملية الرفع
    startUploadProcess(validFiles);
}

/**
 * إعادة تعيين واجهة المستخدم
 */
function resetUI() {
    fileInfo.innerHTML = '';
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
    progressContainer.style.display = 'none';
    progressBar.style.width = '0%';
    progressText.textContent = '0%';
}

/**
 * مسح كافة الحقول
 */
function clearAllFields() {
    // مسح حقل اختيار الملف
    fileInput.value = '';
    
    // إعادة تعيين واجهة المستخدم
    resetUI();
    
    // إعادة تعيين حالة صندوق الرفع
    uploadBox.classList.remove('dragover');
    
    // إعادة تعيين النص في صندوق الرفع
    uploadBox.querySelector('p').textContent = 'اضغط هنا لرفع ملف PDF أو اسحب الملف';
}

/**
 * التحقق من صحة الملفات
 * @param {FileList} files - قائمة الملفات للتحقق
 * @returns {Object} - كائن يحتوي على الملفات الصالحة وحالة الخطأ
 */
function validateFiles(files) {
    let validFiles = [];
    let hasError = false;
    let errorMessage = '';
    
    Array.from(files).forEach(file => {
        // التحقق من نوع الملف
        if (file.type !== 'application/pdf') {
            hasError = true;
            errorMessage = 'يرجى رفع ملفات PDF فقط';
            return;
        }
        
        // التحقق من حجم الملف (5MB)
        if (file.size > 5 * 1024 * 1024) {
            hasError = true;
            errorMessage = 'حجم الملف يجب أن لا يتجاوز 5 ميجابايت';
            return;
        }
        
        validFiles.push(file);
    });
    
    return { validFiles, hasError, errorMessage };
}

/**
 * عرض معلومات الملفات
 * @param {Array} files - قائمة الملفات الصالحة
 */
function displayFileInfo(files) {
    files.forEach(file => {
        const fileSize = formatFileSize(file.size);
        fileInfo.innerHTML += `<p>📄 ${file.name} <span class="file-size">(${fileSize})</span></p>`;
    });
}

/**
 * تنسيق حجم الملف
 * @param {number} bytes - حجم الملف بالبايت
 * @returns {string} - حجم الملف منسق
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
/**
 * عرض رسالة خطأ
 * @param {string} message - رسالة الخطأ
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

/**
 * بدء عملية الرفع
 * @param {Array} files - قائمة الملفات للرفع
 */
function startUploadProcess(files) {
    progressContainer.style.display = 'block';
    
    // محاكاة عملية الرفع (يمكن استبدالها بعملية رفع حقيقية)
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        progressText.textContent = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            successMessage.style.display = 'block';
            
            // إعادة تعيين واجهة المستخدم بعد اكتمال الرفع
            setTimeout(() => {
                clearAllFields();
            }, 3000);
        }
    }, 100);
}
