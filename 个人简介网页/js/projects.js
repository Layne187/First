document.querySelectorAll('.view-source').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const project = e.target.dataset.project;
        const modal = document.createElement('div');
        modal.className = 'source-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>${project} 源代码</h2>
                <div class="tabs">
                    <button class="tab active" data-file="html">HTML</button>
                    <button class="tab" data-file="css">CSS</button>
                    <button class="tab" data-file="js">JavaScript</button>
                </div>
                <pre class="code-display"></pre>
                <button class="close-modal">关闭</button>
            </div>
        `;
        document.body.appendChild(modal);

        // 加载并显示源代码
        loadSourceCode(project, 'html');

        // 绑定标签切换事件
        modal.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                modal.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                loadSourceCode(project, tab.dataset.file);
            });
        });

        // 绑定关闭按钮事件
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
    });
});

async function loadSourceCode(project, fileType) {
    try {
        console.log(`Loading ${fileType} file for ${project}`);
        const filePath = `./projects/${project}/${fileType === 'html' ? 'index.html' :
                fileType === 'css' ? 'style.css' :
                    'script.js'
            }`;
        console.log('Fetching file:', filePath);
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const code = await response.text();
        console.log('File loaded successfully');
        document.querySelector('.code-display').textContent = code;
    } catch (error) {
        console.error(`Error loading ${fileType} file for ${project}:`, error);
        document.querySelector('.code-display').textContent = `Error loading file: ${error.message}`;
    }
} 