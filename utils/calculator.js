class Calculator {
    constructor(height, weight, age, gender, waist) {
        this.height = height
        this.weight = weight
        this.age = age
        this.gender = gender
        this.waist = waist
    }

    leanBodyMass() {
        if (this.gender == "man") {
            const BLM = (0.3281 * this.weight) + (0.33929 * this.height) - 29.5336
            return round(BLM, 2)
        }

        if (this.gender == "woman") {
            const BLM = (0.29569 * this.weight) + (0.41813 * this.height) - 43.2933
            return round(BLM, 2)
        }
    }

    bodyMassIndex() {
        const BMI = this.weight / (this.height / 100) ** 2
        return round(BMI, 2)
    }

    bodyFatPercentage() {
        if (this.gender == "man") {
            BFP = 1.20 * BMI + 0.23 * this.age - 16.2
            if (this.age <= 15) {
                BFP = 1.51 * BMI - 0.70 * this.age - 2.2
            }
            return round(BFP, 2)
        }

        if (this.gender == "woman") {
            BFP = 1.20 * BMI + 0.23 * this.age - 5.4
            if (this.age <= 15) {
                BFP = 1.51 * BMI - 0.70 * this.age + 1.4
            }
            return round(BFP, 2)
        }
    }

    basalMetabolicRate() {
        let s = 0

        if (this.gender == "man") {
            s = +5
        }

        if (this.gender == "woman") {
            s = -161
        }

        const BMR = (this.weight * 10) + (this.height * 6.25) - (this.age * 5) + s
        return round(BMR, 2)
    }
}

module.exports = Calculator