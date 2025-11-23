const MOCK_POSTS = [
    { id: 1, title: "Tìm 2 Dev cho Dự Án Web E-commerce (Cần gấp)", author: "Minh Quân", type: "project", subject: "Lập trình Web", level: "intermediate", format: "online", isLive: true, skills: ["ReactJS", "NodeJS", "MongoDB"], summary: "Cần thành viên có kinh nghiệm làm việc với MERN stack để phát triển một dự án thương mại điện tử nhỏ. Liên hệ để trao đổi chi tiết!" },
    { id: 2, title: "Nhóm ôn tập Giải tích 1", author: "Hồng Ngọc", type: "study", subject: "Toán học", level: "beginner", format: "offline", isLive: false, skills: ["Đại số", "Vi tích phân"], summary: "Ôn tập hàng tuần tại Thư viện trường Đại học Bách Khoa." },
    { id: 3, title: "Dự án Thiết kế UI/UX cho App di động", author: "Thanh Bình", type: "project", subject: "Thiết kế", level: "intermediate", format: "online", isLive: true, skills: ["Figma", "Design Thinking"], summary: "Thiết kế giao diện cho một ứng dụng quản lý thời gian sáng tạo." },
    { id: 4, title: "Cộng đồng luyện IELTS Speaking (Target 7.0+)", author: "Mạnh Hùng", type: "study", subject: "Ngoại ngữ", level: "advanced", format: "online", isLive: false, skills: ["Speaking", "Vocabulary"], summary: "Thực hành nói 3 buổi/tuần qua Zoom." },
    { id: 5, title: "Tìm kế toán viên cho dự án Startup", author: "Thu Phương", type: "project", subject: "Kinh doanh", level: "beginner", format: "hybrid", isLive: true, skills: ["Kế toán cơ bản", "Excel"], summary: "Hỗ trợ quản lý sổ sách và tài chính ban đầu cho Startup công nghệ." },
    { id: 6, title: "Nhóm học Machine Learning", author: "Đức Anh", type: "study", subject: "Khoa học Máy tính", level: "advanced", format: "online", isLive: false, skills: ["Python", "TensorFlow"], summary: "Đọc và thảo luận các paper mới về AI." },
    { id: 7, title: "Tìm đồng đội làm game 2D", author: "Quốc Trung", type: "project", subject: "Lập trình Game", level: "intermediate", format: "online", isLive: true, skills: ["Unity", "C#"], summary: "Phát triển game platformer 2D đơn giản." },
    { id: 8, title: "Ôn thi TOEIC cấp tốc", author: "Mai Linh", type: "study", subject: "Ngoại ngữ", level: "beginner", format: "offline", isLive: false, skills: ["Nghe", "Đọc"], summary: "Học tại quán cà phê gần trường Nhân Văn." },
    { id: 9, title: "Dự án phân tích dữ liệu thị trường", author: "Văn Lâm", type: "project", subject: "Phân tích Dữ liệu", level: "advanced", format: "online", isLive: true, skills: ["R", "SQL", "Thống kê"], summary: "Phân tích xu hướng tiêu dùng trên mạng xã hội." },
    { id: 10, title: "Nhóm Code LeetCode hàng ngày", author: "Thế Phương", type: "study", subject: "Lập trình", level: "intermediate", format: "online", isLive: true, skills: ["Algorithm", "Data Structure"], summary: "Giải quyết các bài toán thuật toán phỏng vấn." }
];

let currentSearchTerm = '';

function navigateTo(pageId, searchTerm = '') {
    const views = document.querySelectorAll('.page-view');
    views.forEach(view => {
        view.style.display = 'none';
    });
    
    const targetView = document.getElementById(`${pageId}-view`);
    if (targetView) {
        targetView.style.display = 'flex';
 
        window.scrollTo(0, 0);

      
        if (pageId === 'explore') {
        
            if (searchTerm) {
                document.getElementById('quick-search-input').value = searchTerm;
                currentSearchTerm = searchTerm;
                applyFilters();
            } else {
                   
                applyFilters();
            }
        }
    } else {
        console.error(`Không tìm thấy view cho ID: ${pageId}-view`);
    }

   
    updateActiveNav(pageId);
    
   
    document.getElementById('mobile-menu').classList.add('hidden');
}


function updateActiveNav(activePageId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active', 'text-white', 'text-bg-dark-text');
       
        link.classList.add('text-bg-dark-text');
    });
    
    const activeLink = document.querySelector(`.nav-link[data-page="${activePageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

function applyFilters() {
    const type = document.getElementById('filter-type').value;
    const subject = document.getElementById('filter-subject').value.toLowerCase();
    const level = document.getElementById('filter-level').value;
    const format = document.getElementById('filter-format').value;
    
    
    const keyword = document.getElementById('quick-search-input').value.toLowerCase();
    
    const filteredPosts = MOCK_POSTS.filter(post => {
       
        if (type && post.type !== type) return false;
        
        if (subject && !post.subject.toLowerCase().includes(subject) && !post.skills.some(s => s.toLowerCase().includes(subject))) return false;

        if (level && post.level !== level) return false;

        if (format && post.format !== format) return false;

        if (keyword && 
            !post.title.toLowerCase().includes(keyword) && 
            !post.summary.toLowerCase().includes(keyword) && 
            !post.subject.toLowerCase().includes(keyword) &&
            !post.skills.some(s => s.toLowerCase().includes(keyword))
            ) return false;

        return true;
    });

    renderResults(filteredPosts);
}

function resetFilters() {
    document.getElementById('filter-type').value = "";
    document.getElementById('filter-subject').value = "";
    document.getElementById('filter-level').value = "";
    document.getElementById('filter-format').value = ""; 
    document.getElementById('quick-search-input').value = ""; 
    applyFilters();
}

function getIcon(name, classes = "w-5 h-5") {
    let path = '';
    switch(name) {
        case 'subject':
            path = 'M12 2L6 5v14l6 3 6-3V5l-6-3zm0 2.8L16.2 7 12 9.2 7.8 7 12 4.8zm-2 15.2V9.8l-3.2 1.6V18l3.2 2zm4 0l-3.2-1.6V9.8l3.2 1.6V20z';
            break;
        case 'format':
            path = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.5-9H15v1.5h-3V11h-1.5v3H11v1.5h1.5v3H15v-3h1.5v-1.5H15V12h1.5v-.5z';
            break;
        case 'level':
            path = 'M16 6l-3.1 3.1 2.5 3.5-6.1 4.3 2.5 3.5-3.8 3.8-1.7-1.7 3.8-3.8-2.5-3.5 6.1-4.3-2.5-3.5L16 6z';
            break;
        default:
            path = '';
    }
    return `<svg class="${classes} text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="${path}"/></svg>`;
}

function renderResults(posts) {
    const resultsContainer = document.getElementById('search-results');
    const summary = document.getElementById('search-results-summary');
    
    summary.textContent = `Tìm thấy ${posts.length} nhóm/dự án phù hợp với tiêu chí của bạn.`;
    resultsContainer.innerHTML = '';
    
    if (posts.length === 0) {
        resultsContainer.innerHTML = '<p class="text-xl text-center py-10 text-gray-500 col-span-full">Không tìm thấy kết quả nào. Hãy thử các từ khóa khác!</p>';
        document.getElementById('load-more-btn').style.display = 'none';
        return;
    }

    posts.forEach(post => {
        const isProject = post.type === 'project';
    
        const badgeClass = isProject ? 'bg-accent text-white shadow-md' : 'bg-callout text-white shadow-md';
        
        const ctaButton = `<button class="block w-full font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-lg shadow-primary/30 btn-gradient flex items-center justify-center transform hover:scale-[1.01]">
                            Xem Chi Tiết / Liên Hệ
                        </button>`;
     
        const levelColor = post.level === 'advanced' ? 'text-callout font-bold' : post.level === 'intermediate' ? 'text-accent font-semibold' : 'text-primary';
        const formatDisplay = post.format.charAt(0).toUpperCase() + post.format.slice(1);
        
        const postElement = `
            <div class="vector-card p-4 rounded-xl flex flex-col shadow-vector hover:shadow-vector-hover hover:border-accent">
             
                <div class="flex items-start justify-between mb-3 pb-3 border-b border-primary/20">
                    <div class="flex items-start">
                    
                        <div class="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-base mr-3 shadow-md flex-shrink-0">
                            ${post.subject.substring(0, 1)}
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold text-primary font-outfit leading-snug">${post.title}</h4>
                            <p class="text-xs text-gray-500 italic mt-0.5">Người đăng: ${post.author}</p>
                        </div>
                    </div>
                </div>

                <div class="flex-grow">
                    <p class="text-gray-600 mb-3 text-sm line-clamp-2">${post.summary}</p>
                    
                    <div class="flex justify-between text-xs mb-3 pt-3 border-t border-gray-100">
                        <div>
                            <div class="flex items-center space-x-1 text-primary mb-1">
                                ${getIcon('level', 'w-3 h-3')}
                                <span class="font-semibold">Trình Độ:</span>
                            </div>
                            <span class="ml-4 text-bg-dark-text ${levelColor} font-medium">${post.level.charAt(0).toUpperCase() + post.level.slice(1)}</span>
                        </div>
                        <div>
                            <div class="flex items-center space-x-1 text-primary mb-1 justify-end">
                                <span class="font-semibold">Hình Thức:</span>
                                ${getIcon('format', 'w-3 h-3')}
                            </div>
                            <span class="ml-4 text-bg-dark-text font-medium block text-right">${formatDisplay}</span>
                        </div>
                    </div>

                    <div class="mt-2 flex flex-wrap gap-1">
                        <span class="px-2 py-0.5 rounded text-xs font-bold ${badgeClass} inline-block">${isProject ? 'DỰ ÁN' : 'HỌC NHÓM'}</span>
                        ${post.skills.slice(0, 2).map(skill => `<span class="px-2 py-0.5 bg-bg-light hover:bg-gray-200 rounded-full text-xs text-primary transition duration-200 border border-primary/20">${skill}</span>`).join('')}
                        ${post.skills.length > 2 ? `<span class="px-2 py-0.5 text-xs text-gray-500"> +${post.skills.length - 2}</span>` : ''}
                    </div>
                </div>

                <div class="mt-4">
                    ${ctaButton}
                </div>
            </div>
        `;
        resultsContainer.insertAdjacentHTML('beforeend', postElement);
    });

    document.getElementById('load-more-btn').style.display = 'none';
}

document.getElementById('post-form-full').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('post-title-full').value;
    const type = document.getElementById('post-type-full').value;
    const description = document.getElementById('post-description-full').value;
    const skills = document.getElementById('post-skills-full').value;
    const location = document.getElementById('post-location-full').value;
    const level = document.getElementById('post-level-full').value;

    console.log("Bài đăng chi tiết mới:", { title, type, description, skills, location, level });

    const messageEl = document.getElementById('post-message-full');
    messageEl.classList.remove('hidden');

    this.reset();

    setTimeout(() => {
        messageEl.classList.add('hidden');
    }, 5000);
});


document.addEventListener('DOMContentLoaded', () => {
    navigateTo('home');
});
