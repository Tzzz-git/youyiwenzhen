# 优医问诊 - 移动端案例 (增强版)

已增强：搜索/分页/筛选、医生详情（评价/写评价）、预约、聊天（持久化到 json-server + 模拟医生回复）。

运行步骤（推荐 pnpm）：
1. 克隆仓库 / 切入目录
2. 安装依赖
   pnpm install
3. 并行启动（推荐）
   pnpm run start
   - mock 后端: http://localhost:4000
   - 前端: http://localhost:5173

或者分别启动：
  pnpm run serve:mock
  pnpm run dev

API 说明（json-server）
- GET /doctors?_page=1&_limit=10&q=关键字
- GET /doctors/:id
- GET /reviews?doctorId=#
- POST /reviews
- GET /chats?doctorId=1&patientId=1
- POST /chats  (创建聊天)
- PATCH /chats/:id  (修改 messages 数组)
- POST /appointments

提示
- json-server 的 PATCH 用法用于更新 chats.messages（示例中 send 封装会处理 create 或 append）。
- 若跨域或端口冲突，请检查端口 4000/5173 是否被占用。
