import {useState} from 'react'
import './App.css'

function App() {
    const [birthDate, setBirthDate] = useState('')
    const [realAge, setRealAge] = useState(null)
    const [funnyAge, setFunnyAge] = useState(null)
    const [message, setMessage] = useState('')
    const [showRules, setShowRules] = useState(false)

    const calculateAge = () => {
        if (!birthDate) {
            setMessage('Пожалуйста, введите дату рождения')
            return
        }

        // Разбиваем введенную дату
        const [day, month, year] = birthDate.split('-').map(Number)

        // Проверка формата
        if (!day || !month || !year || year < 1900 || year > new Date().getFullYear()) {
            setMessage('Пожалуйста, введите дату в формате ДД-ММ-ГГГГ')
            return
        }

        const birthDateObj = new Date(year, month - 1, day)
        const today = new Date()

        // Проверка валидности даты
        if (birthDateObj > today) {
            setMessage('Дата рождения не может быть в будущем!')
            return
        }

        // Рассчитываем реальный возраст
        let age = today.getFullYear() - birthDateObj.getFullYear()
        const monthDiff = today.getMonth() - birthDateObj.getMonth()

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--
        }

        setRealAge(age)

        // Определяем "забавный" возраст по правилам
        let funnyAgeResult = ''
        let description = ''

        if (age < 16) {
            funnyAgeResult = age.toString()
            description = 'Реальный возраст'
        } else if (age >= 16 && age <= 29) {
            funnyAgeResult = '16 лет'
            description = 'Молодость!'
        } else if (age >= 30 && age <= 44) {
            funnyAgeResult = '17 лет'
            description = 'Ещё подросток!'
        } else if (age >= 45 && age <= 55) {
            funnyAgeResult = '25 лет'
            description = 'Расцвет сил!'
        } else if (age >= 56 && age <= 71) {
            funnyAgeResult = '32 года'
            description = 'В самом расцвете!'
        } else if (age >= 72) {
            funnyAgeResult = '50 лет, но это не точно'
            description = 'Опыт и мудрость!'
        }

        setFunnyAge(funnyAgeResult)
        setMessage(description)
    }

    const handleDateChange = (e) => {
        const value = e.target.value
        // Автоматически добавляем дефисы
        if (value.length === 2 || value.length === 5) {
            setBirthDate(value + '-')
        } else {
            setBirthDate(value)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            calculateAge()
        }
    }

    return (
        <div className="app">
            <div className="calculator-container">
                <h1>🎂 Правильный счетчик возраста</h1>
                <p className="subtitle">Узнайте свой верный возраст!</p>

                <div className="input-section">
                    <label htmlFor="birthDate">Введите дату рождения:</label>
                    <input
                        id="birthDate"
                        type="text"
                        placeholder="ДД-ММ-ГГГГ"
                        value={birthDate}
                        onChange={handleDateChange}
                        onKeyPress={handleKeyPress}
                        maxLength="10"
                    />
                    <small>Формат: день-месяц-год (например: 15-05-1990)</small>
                </div>

                <button onClick={calculateAge} className="calculate-btn">
                    Узнать мой возраст
                </button>

                {message && (
                    <div className="results">

                        {funnyAge && (
                            <div className="age-result funny-age">
                                <span className="label">Ваш возраст:</span>
                                <span className="value">{funnyAge}</span>
                            </div>
                        )}

                        <div className="message">
                            {message}
                        </div>
                    </div>
                )}

                <button
                    className={`rules-header ${showRules ? 'active' : ''}`}
                    onClick={() => setShowRules(!showRules)}
                >
                    <h3>📋 Правила перевода возраста:</h3>
                </button>

                {showRules && (
                    <div className="rules-content">
                        <ul>
                            <li>До 16 лет — реальный возраст</li>
                            <li>16-29 лет — вам 16 лет</li>
                            <li>30-44 лет — вам 17 лет</li>
                            <li>45-55 лет — вам 25 лет</li>
                            <li>56-71 лет — вам 32 года</li>
                            <li>72+ лет — вам 50 лет, но это не точно 😉</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

// Вспомогательная функция для правильного склонения
function getAgeWord(age) {
    const lastDigit = age % 10
    const lastTwoDigits = age % 100

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'лет'
    }

    if (lastDigit === 1) {
        return 'год'
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return 'года'
    }

    return 'лет'
}

export default App
