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
        // Cuộn lên đầu trang
        window.scrollTo(0, 0);

        // Xử lý logic cụ thể cho từng trang
        if (pageId === 'explore') {
            // Cập nhật input tìm kiếm và áp dụng bộ lọc nếu có từ khóa
            if (searchTerm) {
                document.getElementById('quick-search-input').value = searchTerm;
                currentSearchTerm = searchTerm;
                applyFilters();
            } else {
                    // Nếu không có searchTerm, chỉ hiển thị tất cả bài viết theo bộ lọc hiện tại
                applyFilters();
            }
        }
    } else {
        console.error(`Không tìm thấy view cho ID: ${pageId}-view`);
    }

    // Cập nhật trạng thái active cho menu
    updateActiveNav(pageId);
    
    // Ẩn mobile menu sau khi click
    document.getElementById('mobile-menu').classList.add('hidden');
}

/**
 * Cập nhật trạng thái active cho các liên kết menu
 * @param {string} activePageId - ID của trang đang hoạt động
 */
function updateActiveNav(activePageId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active', 'text-white', 'text-bg-dark-text');
        // Đảm bảo màu chữ mặc định là màu tối trên nền sáng
        link.classList.add('text-bg-dark-text');
    });
    
    const activeLink = document.querySelector(`.nav-link[data-page="${activePageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

/**
 * Xử lý đóng/mở Mobile Menu
 */
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// --- Chức năng Tìm Kiếm (Explore) ---

/**
 * Áp dụng các bộ lọc và hiển thị kết quả
 */
function applyFilters() {
    const type = document.getElementById('filter-type').value;
    const subject = document.getElementById('filter-subject').value.toLowerCase();
    const level = document.getElementById('filter-level').value;
    const format = document.getElementById('filter-format').value;
    
    // Sử dụng currentSearchTerm từ Home hoặc từ quick-search-input nếu đang ở Explore
    const keyword = document.getElementById('quick-search-input').value.toLowerCase();
    
    const filteredPosts = MOCK_POSTS.filter(post => {
        // Lọc theo Loại hình
        if (type && post.type !== type) return false;
        
        // Lọc theo Môn học/Lĩnh vực
        if (subject && !post.subject.toLowerCase().includes(subject) && !post.skills.some(s => s.toLowerCase().includes(subject))) return false;

        // Lọc theo Cấp độ
        if (level && post.level !== level) return false;

        // Lọc theo Hình thức (Cập nhật dùng select thay vì checkbox)
        if (format && post.format !== format) return false;

        // Lọc theo Từ khóa chung (title, summary, skills)
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

/**
 * Đặt lại các bộ lọc về mặc định
 */
function resetFilters() {
    document.getElementById('filter-type').value = "";
    document.getElementById('filter-subject').value = "";
    document.getElementById('filter-level').value = "";
    document.getElementById('filter-format').value = ""; // Đặt lại format
    document.getElementById('quick-search-input').value = ""; // Đặt lại thanh tìm kiếm nhanh
    applyFilters();
}

/**
 * Hàm helper để tạo SVG icon đơn giản
 */
function getIcon(name, classes = "w-5 h-5") {
    let path = '';
    switch(name) {
        case 'subject':
            // Book Open
            path = 'M12 2L6 5v14l6 3 6-3V5l-6-3zm0 2.8L16.2 7 12 9.2 7.8 7 12 4.8zm-2 15.2V9.8l-3.2 1.6V18l3.2 2zm4 0l-3.2-1.6V9.8l3.2 1.6V20z';
            break;
        case 'format':
            // Globe/Map Pin
            path = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.5-9H15v1.5h-3V11h-1.5v3H11v1.5h1.5v3H15v-3h1.5v-1.5H15V12h1.5v-.5z';
            break;
        case 'level':
            // Trending Up (Level Up)
            path = 'M16 6l-3.1 3.1 2.5 3.5-6.1 4.3 2.5 3.5-3.8 3.8-1.7-1.7 3.8-3.8-2.5-3.5 6.1-4.3-2.5-3.5L16 6z';
            break;
        default:
            path = '';
    }
    // Icon color is primary color
    return `<svg class="${classes} text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="${path}"/></svg>`;
}

/**
 * Render danh sách kết quả tìm kiếm (Không còn nút LIVE)
 * @param {Array} posts - Mảng các bài đăng đã được lọc
 */
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
        // Badge: Nền sáng/Accent, Text tối
        const badgeClass = isProject ? 'bg-accent text-white shadow-md' : 'bg-callout text-white shadow-md';
        
        // Nút CTA mới (Chỉ còn Xem Chi Tiết / Liên Hệ)
        const ctaButton = `<button class="block w-full font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-lg shadow-primary/30 btn-gradient flex items-center justify-center transform hover:scale-[1.01]">
                            Xem Chi Tiết / Liên Hệ
                        </button>`;
        
        // Màu Level
        const levelColor = post.level === 'advanced' ? 'text-callout font-bold' : post.level === 'intermediate' ? 'text-accent font-semibold' : 'text-primary';
        const formatDisplay = post.format.charAt(0).toUpperCase() + post.format.slice(1);
        
        const postElement = `
            <div class="vector-card p-4 rounded-xl flex flex-col shadow-vector hover:shadow-vector-hover hover:border-accent">
                
                <!-- Header Thẻ (Avatar + Type) -->
                <div class="flex items-start justify-between mb-3 pb-3 border-b border-primary/20">
                    <div class="flex items-start">
                        <!-- Placeholder Avatar -->
                        <div class="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-base mr-3 shadow-md flex-shrink-0">
                            ${post.subject.substring(0, 1)}
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold text-primary font-outfit leading-snug">${post.title}</h4>
                            <p class="text-xs text-gray-500 italic mt-0.5">Người đăng: ${post.author}</p>
                        </div>
                    </div>
                </div>

                <!-- Nội dung & Metadata -->
                <div class="flex-grow">
                    <p class="text-gray-600 mb-3 text-sm line-clamp-2">${post.summary}</p>
                    
                    <!-- Metadata Chi tiết hơn -->
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

                    <!-- Skill Tags -->
                    <div class="mt-2 flex flex-wrap gap-1">
                        <span class="px-2 py-0.5 rounded text-xs font-bold ${badgeClass} inline-block">${isProject ? 'DỰ ÁN' : 'HỌC NHÓM'}</span>
                        ${post.skills.slice(0, 2).map(skill => `<span class="px-2 py-0.5 bg-bg-light hover:bg-gray-200 rounded-full text-xs text-primary transition duration-200 border border-primary/20">${skill}</span>`).join('')}
                        ${post.skills.length > 2 ? `<span class="px-2 py-0.5 text-xs text-gray-500"> +${post.skills.length - 2}</span>` : ''}
                    </div>
                </div>

                <!-- Cột CTA -->
                <div class="mt-4">
                    ${ctaButton}
                </div>
            </div>
        `;
        resultsContainer.insertAdjacentHTML('beforeend', postElement);
    });
    
    // Ẩn nút "Xem Thêm" do đây là dữ liệu giả định
    document.getElementById('load-more-btn').style.display = 'none';
}

// --- Logic Pomodoro Timer & LIVE Room đã bị loại bỏ ---


// --- Logic Đăng Bài (Post) - Form chi tiết trên Post-View ---
document.getElementById('post-form-full').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Lấy dữ liệu từ form chi tiết
    const title = document.getElementById('post-title-full').value;
    const type = document.getElementById('post-type-full').value;
    const description = document.getElementById('post-description-full').value;
    const skills = document.getElementById('post-skills-full').value;
    const location = document.getElementById('post-location-full').value;
    const level = document.getElementById('post-level-full').value;

    // Log dữ liệu bài đăng (Trong thực tế sẽ gửi lên server)
    console.log("Bài đăng chi tiết mới:", { title, type, description, skills, location, level });

    // Hiển thị thông báo thành công
    const messageEl = document.getElementById('post-message-full');
    messageEl.classList.remove('hidden');
    
    // Reset form
    this.reset();
    
    // Tự động ẩn thông báo sau 5 giây
    setTimeout(() => {
        messageEl.classList.add('hidden');
    }, 5000);
});


// --- Khởi tạo ứng dụng ---
document.addEventListener('DOMContentLoaded', () => {
    // Hiển thị trang chủ ban đầu
    navigateTo('home');
});
