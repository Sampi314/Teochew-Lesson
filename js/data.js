// Teochew vocabulary data organized by category
// Each entry: { hanzi, pengim, meaning (Vietnamese), hanviet (Hán-Việt equivalent), vietPhonetic (approximate Vietnamese reading of Teochew) }

const CATEGORIES = [
    {
        id: "greetings",
        name: "Chào hỏi",
        icon: "👋",
        words: [
            { hanzi: "你好", pengim: "lṳ² hó²", meaning: "Xin chào", hanviet: "Nhĩ hảo", vietPhonetic: "lư hó" },
            { hanzi: "食飽未", pengim: "ziah⁸ bá² buê⁷", meaning: "Ăn cơm chưa? (lời chào)", hanviet: "Thực bão vị", vietPhonetic: "dia bá buê" },
            { hanzi: "多謝", pengim: "do¹ siā⁷", meaning: "Cảm ơn", hanviet: "Đa tạ", vietPhonetic: "đo xia" },
            { hanzi: "免客氣", pengim: "miêng² kêh⁴ ki³", meaning: "Không có gì / Đừng khách sáo", hanviet: "Miễn khách khí", vietPhonetic: "miêng kê khi" },
            { hanzi: "對唔住", pengim: "dui³ m⁷ zṳ⁶", meaning: "Xin lỗi", hanviet: "Đối m trụ", vietPhonetic: "đui m dư" },
            { hanzi: "再見", pengim: "zai³ giêng³", meaning: "Tạm biệt", hanviet: "Tái kiến", vietPhonetic: "dai giêng" },
            { hanzi: "請問", pengim: "ciáng² mung⁷", meaning: "Xin hỏi", hanviet: "Thỉnh vấn", vietPhonetic: "chiáng mung" },
            { hanzi: "早起", pengim: "zá² kí²", meaning: "Chào buổi sáng", hanviet: "Tảo khởi", vietPhonetic: "dá khí" },
            { hanzi: "好佳哉", pengim: "hó² gai¹ zai¹", meaning: "May quá / May mắn", hanviet: "Hảo gia tai", vietPhonetic: "hó gai dai" },
            { hanzi: "歡迎", pengim: "huêng¹ ngiêng⁵", meaning: "Chào mừng", hanviet: "Hoan nghênh", vietPhonetic: "huêng nghiêng" },
        ]
    },
    {
        id: "numbers",
        name: "Số đếm",
        icon: "🔢",
        words: [
            { hanzi: "一", pengim: "ig⁴ / zêg⁸", meaning: "Một (1)", hanviet: "Nhất", vietPhonetic: "ích / dệch" },
            { hanzi: "二", pengim: "no⁶", meaning: "Hai (2)", hanviet: "Nhị", vietPhonetic: "nó" },
            { hanzi: "三", pengim: "sañ¹", meaning: "Ba (3)", hanviet: "Tam", vietPhonetic: "xang" },
            { hanzi: "四", pengim: "si³", meaning: "Bốn (4)", hanviet: "Tứ", vietPhonetic: "xi" },
            { hanzi: "五", pengim: "ngóu⁶", meaning: "Năm (5)", hanviet: "Ngũ", vietPhonetic: "ngóu" },
            { hanzi: "六", pengim: "lag⁸", meaning: "Sáu (6)", hanviet: "Lục", vietPhonetic: "lác" },
            { hanzi: "七", pengim: "cig⁴", meaning: "Bảy (7)", hanviet: "Thất", vietPhonetic: "chích" },
            { hanzi: "八", pengim: "boih⁴", meaning: "Tám (8)", hanviet: "Bát", vietPhonetic: "boi" },
            { hanzi: "九", pengim: "gáu²", meaning: "Chín (9)", hanviet: "Cửu", vietPhonetic: "gáu" },
            { hanzi: "十", pengim: "zab⁸", meaning: "Mười (10)", hanviet: "Thập", vietPhonetic: "dáp" },
            { hanzi: "百", pengim: "bêh⁴", meaning: "Trăm (100)", hanviet: "Bách", vietPhonetic: "bê" },
            { hanzi: "千", pengim: "coiñ¹", meaning: "Ngàn (1000)", hanviet: "Thiên", vietPhonetic: "choi" },
            { hanzi: "萬", pengim: "bhuêng⁷", meaning: "Vạn (10000)", hanviet: "Vạn", vietPhonetic: "buêng" },
        ]
    },
    {
        id: "family",
        name: "Gia đình",
        icon: "👨‍👩‍👧‍👦",
        words: [
            { hanzi: "阿爸", pengim: "a¹ bê⁶", meaning: "Cha / Ba", hanviet: "A ba", vietPhonetic: "a bê" },
            { hanzi: "阿母", pengim: "a¹ bó²", meaning: "Mẹ / Má", hanviet: "A mẫu", vietPhonetic: "a bó" },
            { hanzi: "阿兄", pengim: "a¹ hiañ¹", meaning: "Anh trai", hanviet: "A huynh", vietPhonetic: "a hiang" },
            { hanzi: "阿姐", pengim: "a¹ zé²", meaning: "Chị gái", hanviet: "A tỉ", vietPhonetic: "a dé" },
            { hanzi: "阿弟", pengim: "a¹ di⁶", meaning: "Em trai", hanviet: "A đệ", vietPhonetic: "a đi" },
            { hanzi: "阿妹", pengim: "a¹ muê⁷", meaning: "Em gái", hanviet: "A muội", vietPhonetic: "a muê" },
            { hanzi: "阿公", pengim: "a¹ gong¹", meaning: "Ông nội", hanviet: "A công", vietPhonetic: "a gong" },
            { hanzi: "阿嬤", pengim: "a¹ mâ²", meaning: "Bà nội", hanviet: "A ma", vietPhonetic: "a ma" },
            { hanzi: "丈夫", pengim: "diên⁶ hu¹", meaning: "Chồng", hanviet: "Trượng phu", vietPhonetic: "điên hu" },
            { hanzi: "某", pengim: "bhou²", meaning: "Vợ", hanviet: "Mỗ", vietPhonetic: "bâu" },
            { hanzi: "囝", pengim: "giáñ²", meaning: "Con", hanviet: "Tử", vietPhonetic: "giáng" },
            { hanzi: "孫", pengim: "sung¹", meaning: "Cháu", hanviet: "Tôn", vietPhonetic: "xung" },
        ]
    },
    {
        id: "food",
        name: "Thức ăn",
        icon: "🍜",
        words: [
            { hanzi: "飯", pengim: "bung⁷", meaning: "Cơm", hanviet: "Phạn", vietPhonetic: "bung" },
            { hanzi: "粥", pengim: "muê⁵", meaning: "Cháo", hanviet: "Chúc", vietPhonetic: "muê" },
            { hanzi: "麵", pengim: "mī⁷", meaning: "Mì", hanviet: "Miến", vietPhonetic: "mi" },
            { hanzi: "粿條", pengim: "guê² diou⁵", meaning: "Hủ tiếu", hanviet: "Quả điều", vietPhonetic: "guê điêu" },
            { hanzi: "茶", pengim: "dê⁵", meaning: "Trà", hanviet: "Trà", vietPhonetic: "đê" },
            { hanzi: "魚", pengim: "hṳ⁵", meaning: "Cá", hanviet: "Ngư", vietPhonetic: "hư" },
            { hanzi: "肉", pengim: "nêg⁸", meaning: "Thịt", hanviet: "Nhục", vietPhonetic: "nệch" },
            { hanzi: "菜", pengim: "cai³", meaning: "Rau", hanviet: "Thái", vietPhonetic: "chai" },
            { hanzi: "蛋", pengim: "nñg⁷", meaning: "Trứng", hanviet: "Đản", vietPhonetic: "nựng" },
            { hanzi: "豆腐", pengim: "dāu⁷ hū⁷", meaning: "Đậu hũ / Đậu phụ", hanviet: "Đậu hủ", vietPhonetic: "đâu hu" },
            { hanzi: "鹹", pengim: "giâm⁵", meaning: "Mặn", hanviet: "Hàm", vietPhonetic: "giâm" },
            { hanzi: "甜", pengim: "diám⁵", meaning: "Ngọt", hanviet: "Điềm", vietPhonetic: "điám" },
            { hanzi: "酸", pengim: "sñg¹", meaning: "Chua", hanviet: "Toan", vietPhonetic: "xưng" },
            { hanzi: "辣", pengim: "huah⁸", meaning: "Cay", hanviet: "Lạt", vietPhonetic: "hua" },
        ]
    },
    {
        id: "daily",
        name: "Giao tiếp hàng ngày",
        icon: "💬",
        words: [
            { hanzi: "是", pengim: "sī⁶", meaning: "Là / Đúng", hanviet: "Thị", vietPhonetic: "xi" },
            { hanzi: "唔是", pengim: "m⁷ sī⁶", meaning: "Không phải", hanviet: "M thị", vietPhonetic: "m xi" },
            { hanzi: "好", pengim: "hó²", meaning: "Tốt / Được", hanviet: "Hảo", vietPhonetic: "hó" },
            { hanzi: "我", pengim: "uá²", meaning: "Tôi", hanviet: "Ngã", vietPhonetic: "uá" },
            { hanzi: "你", pengim: "lṳ²", meaning: "Bạn", hanviet: "Nhĩ", vietPhonetic: "lư" },
            { hanzi: "伊", pengim: "i¹", meaning: "Anh ấy / Cô ấy", hanviet: "Y", vietPhonetic: "i" },
            { hanzi: "這個", pengim: "zi² gai⁵", meaning: "Cái này", hanviet: "Giá cá", vietPhonetic: "di gai" },
            { hanzi: "許個", pengim: "hṳ² gai⁵", meaning: "Cái đó", hanviet: "Hứa cá", vietPhonetic: "hư gai" },
            { hanzi: "乜個", pengim: "mih⁴ gai⁵", meaning: "Cái gì?", hanviet: "Miệt cá", vietPhonetic: "mi gai" },
            { hanzi: "幾多錢", pengim: "gui² do¹ zîñ⁵", meaning: "Bao nhiêu tiền?", hanviet: "Kỷ đa tiền", vietPhonetic: "gui đo dìn" },
            { hanzi: "佇塊", pengim: "do⁶ go³", meaning: "Ở đâu?", hanviet: "Trữ khối", vietPhonetic: "đo go" },
            { hanzi: "愛", pengim: "ài³", meaning: "Muốn / Yêu", hanviet: "Ái", vietPhonetic: "ài" },
            { hanzi: "唔愛", pengim: "m⁷ ài³", meaning: "Không muốn", hanviet: "M ái", vietPhonetic: "m ài" },
            { hanzi: "會曉", pengim: "oi⁶ hiáu²", meaning: "Biết (làm)", hanviet: "Hội hiểu", vietPhonetic: "oi hiáu" },
        ]
    },
    {
        id: "places",
        name: "Địa điểm",
        icon: "🏠",
        words: [
            { hanzi: "厝", pengim: "cù³", meaning: "Nhà", hanviet: "Thố", vietPhonetic: "chù" },
            { hanzi: "學堂", pengim: "oh⁸ dṳ̂ng⁵", meaning: "Trường học", hanviet: "Học đường", vietPhonetic: "o dưng" },
            { hanzi: "街", pengim: "goi¹", meaning: "Đường phố", hanviet: "Nhai", vietPhonetic: "goi" },
            { hanzi: "市場", pengim: "ci⁶ diêñ⁵", meaning: "Chợ / Thị trường", hanviet: "Thị trường", vietPhonetic: "chi điêng" },
            { hanzi: "病院", pengim: "bēñ⁷ īñ⁷", meaning: "Bệnh viện", hanviet: "Bệnh viện", vietPhonetic: "beng ing" },
            { hanzi: "銀行", pengim: "ngṳng⁵ hâng⁵", meaning: "Ngân hàng", hanviet: "Ngân hàng", vietPhonetic: "ngưng hâng" },
            { hanzi: "廟", pengim: "biō⁷", meaning: "Miếu / Đền", hanviet: "Miếu", vietPhonetic: "bio" },
            { hanzi: "店", pengim: "diàm³", meaning: "Tiệm / Cửa hàng", hanviet: "Điếm", vietPhonetic: "điàm" },
        ]
    },
    {
        id: "time",
        name: "Thời gian",
        icon: "🕐",
        words: [
            { hanzi: "今日", pengim: "ging¹ rig⁸", meaning: "Hôm nay", hanviet: "Kim nhật", vietPhonetic: "ging rịch" },
            { hanzi: "明日", pengim: "ma⁵ rig⁸", meaning: "Ngày mai", hanviet: "Minh nhật", vietPhonetic: "ma rịch" },
            { hanzi: "昨日", pengim: "za¹ rig⁸", meaning: "Hôm qua", hanviet: "Tạc nhật", vietPhonetic: "da rịch" },
            { hanzi: "早起", pengim: "zá² kí²", meaning: "Buổi sáng", hanviet: "Tảo khởi", vietPhonetic: "dá khí" },
            { hanzi: "日晝", pengim: "rig⁸ diu³", meaning: "Buổi trưa", hanviet: "Nhật trú", vietPhonetic: "rịch điu" },
            { hanzi: "暗暝", pengim: "àm³ mê⁵", meaning: "Buổi tối", hanviet: "Ám minh", vietPhonetic: "àm mê" },
            { hanzi: "禮拜", pengim: "loi⁶ bai³", meaning: "Tuần", hanviet: "Lễ bái", vietPhonetic: "loi bai" },
            { hanzi: "月", pengim: "ghuêh⁸", meaning: "Tháng", hanviet: "Nguyệt", vietPhonetic: "guệ" },
            { hanzi: "年", pengim: "nî⁵", meaning: "Năm", hanviet: "Niên", vietPhonetic: "ni" },
        ]
    },
    {
        id: "phrases",
        name: "Cụm từ thông dụng",
        icon: "🗣️",
        words: [
            { hanzi: "我是潮州人", pengim: "uá² sī⁶ Diê⁵ziu¹ nâng⁵", meaning: "Tôi là người Triều Châu", hanviet: "Ngã thị Triều Châu nhân", vietPhonetic: "uá xi điê diu nâng" },
            { hanzi: "你是乜個人", pengim: "lṳ² sī⁶ mih⁴ gai⁵ nâng⁵", meaning: "Bạn là người nước nào?", hanviet: "Nhĩ thị miệt cá nhân", vietPhonetic: "lư xi mi gai nâng" },
            { hanzi: "我是越南人", pengim: "uá² sī⁶ Uag⁸ Lam⁵ nâng⁵", meaning: "Tôi là người Việt Nam", hanviet: "Ngã thị Việt Nam nhân", vietPhonetic: "uá xi uạc lam nâng" },
            { hanzi: "我唔會曉講潮州話", pengim: "uá² m⁷ oi⁶ hiáu² gong² Diê⁵ziu¹ uê⁷", meaning: "Tôi không biết nói tiếng Triều Châu", hanviet: "Ngã m hội hiểu giảng Triều Châu thoại", vietPhonetic: "uá m oi hiáu gong điê diu uê" },
            { hanzi: "請你講慢些", pengim: "ciáng² lṳ² gong² mang⁷ sê²", meaning: "Xin nói chậm hơn", hanviet: "Thỉnh nhĩ giảng mạn ta", vietPhonetic: "chiáng lư gong mang xê" },
            { hanzi: "我聽無", pengim: "uá² tiañ¹ bô⁵", meaning: "Tôi không nghe hiểu", hanviet: "Ngã thính vô", vietPhonetic: "uá thiang bô" },
            { hanzi: "這個好食", pengim: "zi² gai⁵ hó² ziah⁸", meaning: "Cái này ngon", hanviet: "Giá cá hảo thực", vietPhonetic: "di gai hó dia" },
            { hanzi: "幾多錢", pengim: "gui² do¹ zîñ⁵", meaning: "Bao nhiêu tiền?", hanviet: "Kỷ đa tiền", vietPhonetic: "gui đo dìn" },
            { hanzi: "我愛學潮州話", pengim: "uá² ài³ oh⁸ Diê⁵ziu¹ uê⁷", meaning: "Tôi muốn học tiếng Triều Châu", hanviet: "Ngã ái học Triều Châu thoại", vietPhonetic: "uá ài o điê diu uê" },
            { hanzi: "新年好", pengim: "sing¹ nî⁵ hó²", meaning: "Chúc mừng năm mới", hanviet: "Tân niên hảo", vietPhonetic: "xing ni hó" },
        ]
    },
    {
        id: "bodyparts",
        name: "Cơ thể",
        icon: "🧑",
        words: [
            { hanzi: "頭", pengim: "tao⁵", meaning: "Đầu", hanviet: "Đầu", vietPhonetic: "thao" },
            { hanzi: "目", pengim: "mag⁸", meaning: "Mắt", hanviet: "Mục", vietPhonetic: "mác" },
            { hanzi: "耳", pengim: "hīñ⁷", meaning: "Tai", hanviet: "Nhĩ", vietPhonetic: "hing" },
            { hanzi: "鼻", pengim: "pīñ⁷", meaning: "Mũi", hanviet: "Tị", vietPhonetic: "phing" },
            { hanzi: "嘴", pengim: "cui³", meaning: "Miệng", hanviet: "Chủy", vietPhonetic: "chui" },
            { hanzi: "手", pengim: "ciu²", meaning: "Tay", hanviet: "Thủ", vietPhonetic: "chiu" },
            { hanzi: "腳", pengim: "ka¹", meaning: "Chân", hanviet: "Cước", vietPhonetic: "kha" },
            { hanzi: "心", pengim: "sim¹", meaning: "Tim / Lòng", hanviet: "Tâm", vietPhonetic: "xim" },
            { hanzi: "腹", pengim: "bag⁴", meaning: "Bụng", hanviet: "Phúc", vietPhonetic: "bác" },
        ]
    },
    {
        id: "colors",
        name: "Màu sắc",
        icon: "🎨",
        words: [
            { hanzi: "紅", pengim: "âng⁵", meaning: "Đỏ", hanviet: "Hồng", vietPhonetic: "âng" },
            { hanzi: "白", pengim: "bêh⁸", meaning: "Trắng", hanviet: "Bạch", vietPhonetic: "bệ" },
            { hanzi: "烏", pengim: "ou¹", meaning: "Đen", hanviet: "Ô", vietPhonetic: "ou" },
            { hanzi: "青", pengim: "cêñ¹", meaning: "Xanh lá / Xanh", hanviet: "Thanh", vietPhonetic: "chênh" },
            { hanzi: "黃", pengim: "ng⁵", meaning: "Vàng", hanviet: "Hoàng", vietPhonetic: "ng" },
            { hanzi: "藍", pengim: "lam⁵", meaning: "Xanh dương", hanviet: "Lam", vietPhonetic: "lam" },
            { hanzi: "金", pengim: "gim¹", meaning: "Vàng kim", hanviet: "Kim", vietPhonetic: "ghim" },
        ]
    }
];

// Flatten all words for quiz and daily word
function getAllWords() {
    const all = [];
    CATEGORIES.forEach(cat => {
        cat.words.forEach(w => {
            all.push({ ...w, category: cat.id, categoryName: cat.name });
        });
    });
    return all;
}
