const aiService = {
  getSmartResponse: (input) => {
    const text = input.toLowerCase();

    if (text.includes("attendance")) {
      return "Your attendance can be checked in the Students section of the Admin Dashboard. Each student has a live attendance percentage shown with a visual progress bar. Students below 80% are flagged with a warning status.";
    }
    if (text.includes("result") || text.includes("gpa")) {
      return "Results are available in the 'Results' section. You can view GPA by subject with a comparison against the previous semester, plus a full grade distribution chart. Click 'Table View' to see all subjects in detail.";
    }
    if (text.includes("fee") || text.includes("payment") || text.includes("tuition")) {
      return "Go to 'Fee Management' to view all student payment statuses. You can mark fees as paid, track outstanding amounts, and see a summary of collection rate. Overdue payments are highlighted in red for quick action.";
    }
    if (text.includes("schedule") || text.includes("class") || text.includes("timetable")) {
      return "The weekly schedule is in the 'Schedule' section. You can filter by day of the week to see specific classes. Each entry shows subject, teacher, room, and timing. You can add new classes using the '+ Add Class' button.";
    }
    if (text.includes("top") || text.includes("best") || text.includes("excellent")) {
      return "Top performing students include Faria Hossain (GPA 3.96, 99% attendance) and Nusrat Jahan (GPA 3.91, 98% attendance). Both are marked as 'Excellent' status in the Students panel. You can filter by 'Excellent' to see all high performers.";
    }
    if (text.includes("enroll") || text.includes("new student") || text.includes("add student")) {
      return "To enroll a new student, click '+ Enroll Student' in the Students section or '+ Add Student' on the Dashboard. Fill in their name, email, batch year, and initial details. They'll appear in all tracking panels automatically.";
    }
    if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
      return "Hello! 👋 I'm your EduSmart AI assistant. I can help you navigate the dashboard, find student information, check fees, view schedules, and more. What do you need help with today?";
    }
    if (text.includes("help")) {
      return "Here's what I can help you with: ① Student management & profiles ② Academic results & GPA tracking ③ Fee payments & collection ④ Weekly class schedules ⑤ Attendance monitoring. Just ask me anything!";
    }

    return "I can help you with student management, academic results, fee tracking, and class schedules. Try asking about a specific feature or type 'help' to see all options.";
  },
};

export default aiService;
