// const uploadBox = document.getElementById('uploadBox');
// const fileInput = document.getElementById('fileInput');
// const progressBar = document.getElementById('progressBar');
// const progressContainer = document.getElementById('progressContainer');
// const progressText = document.getElementById('progressText');
// const fileInfo = document.getElementById('fileInfo');
// const successMessage = document.getElementById('successMessage');

// uploadBox.addEventListener('click', () => fileInput.click());
// uploadBox.addEventListener('dragover', (e) => {
//     e.preventDefault();
//     uploadBox.classList.add('dragover');
// });
// uploadBox.addEventListener('dragleave', () => uploadBox.classList.remove('dragover'));
// uploadBox.addEventListener('drop', (e) => {
//     e.preventDefault();
//     uploadBox.classList.remove('dragover');
//     handleFiles(e.dataTransfer.files);
// });
// fileInput.addEventListener('change', () => handleFiles(fileInput.files));

// function handleFiles(files) {
//     if (files.length === 0) return;
//     progressContainer.style.display = 'block';
//     successMessage.style.display = 'none';
//     fileInfo.innerHTML = '';
    
//     Array.from(files).forEach(file => {
//         let fileTypeIcon = '';
//         if (file.type.includes('image')) fileTypeIcon = '🖼️';
//         else if (file.type.includes('pdf')) fileTypeIcon = '📄';
//         else if (file.type.includes('word')) fileTypeIcon = '📝';
//         else fileTypeIcon = '📁';
        
//         fileInfo.innerHTML += `<p>${fileTypeIcon} ${file.name}</p>`;
//     });
    
//     let progress = 0;
//     const interval = setInterval(() => {
//         progress += 10;
//         progressBar.style.width = progress + '%';
//         progressText.textContent = progress + '%';
//         if (progress >= 100) {
//             clearInterval(interval);
//             successMessage.style.display = 'block';
//         }
//     }, 200);
// }

const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('fileInput');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');
const progressText = document.getElementById('progressText');
const fileInfo = document.getElementById('fileInfo');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

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

function handleFiles(files) {
    if (files.length === 0) return;
    fileInfo.innerHTML = '';
    errorMessage.style.display = 'none';
    
    let validFiles = [];
    Array.from(files).forEach(file => {
        if (file.type !== 'application/pdf') {
            errorMessage.style.display = 'block';
            return;
        }
        validFiles.push(file);
        fileInfo.innerHTML += `<p>📄 ${file.name}</p>`;
    });
    
    if (validFiles.length === 0) return;
    
    progressContainer.style.display = 'block';
    successMessage.style.display = 'none';
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = progress + '%';
        progressText.textContent = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            successMessage.style.display = 'block';
        }
    }, 200);
}