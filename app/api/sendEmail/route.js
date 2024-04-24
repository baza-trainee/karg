import { sendMail } from "@/lib/mail";

export async function POST(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, message: 'Method Not Allowed' }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 405,
    });
  }
  //simulating a check in a database
  const validEmail = "kargthebest2024@gmail.com";

  try {
    const { email } = await req.json();
    if (email === validEmail) {
      const resetLink = 'http://localhost:3000/en/auth/reset';
      const emailSubject = "Відновлення паролю";
      const htmlContent = `
    <div>
      <div>
        <p>Вітаємо!</p>
        <p>
          Ми отримали запит на відновлення паролю для облікового запису
          контрольної панелі на сайті КАРГ, що пов'язаний з Вашою електронною
          адресою.
        </p>
        <p>
          Якщо Ви дійсно бажаєте відновити пароль, можете це зробити натиснувши
          на посилання:
        </p>
      </div>
      <a
        href="${resetLink}"
        style="
          display: inline-block;
          padding: 10px 20px;
          background-color: #ffa33c;
          color: white;
          text-align: center;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
        "
      >
        Змінити пароль
      </a>
      <div>
        <p>
          Якщо Ви не подавали запит до відновлення паролю - не відповідайте на
          цей лист.
        </p>
        <p>З повагою, команда КАРГ.</p>
      </div>
    </div>
  `;
      await sendMail(emailSubject, email, htmlContent);
      
      return new Response(JSON.stringify({ success: true, message: 'Success' }), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ success: false, message: 'Email not confirmed' }), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      });
    }
  } catch (err) {
    console.error("Processing error:", err);
    return new Response(JSON.stringify({ success: false, message: 'Failure' }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
}
