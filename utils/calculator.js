class Calculator {
    // constructor(height, weight, age, gender) {
    //     this.height = height
    //     this.weight = weight
    //     this.age = age
    //     this.gender = gender
    // }


    static leanBodyMass(gender, weight, height) {
        if (gender == "male") {
            const BLM = 0.407 * weight + 0.267 * (height / 100) * 100 - 19.22
            return BLM.toFixed(2)
        }

        if (this.gender == "female") {
            BLM = 0.252 * weight + 0.473 * (height / 100) * 100 - 48.3
            return BLM.toFixed(2)
        }
    }

    static bodyMassIndex(weight, height) {
        const BMI = weight / (height / 100) ** 2
        return BMI.toFixed(2)
    }

    static bodyFatPercentage(gender, age, weight, height) {
        if (gender == "male") {
            const BFP = 1.20 * this.bodyMassIndex(weight, height) + 0.23 * age - 16.2
            if (age <= 15) {
                BFP = 1.51 * this.bodyMassIndex(weight, height) - 0.70 * age - 2.2
            }
            return BFP.toFixed(2)
        }

        if (gender == "female") {
            BFP = 1.20 * this.bodyMassIndex() + 0.23 * age - 5.4
            if (age <= 15) {
                BFP = 1.51 * this.bodyMassIndex() - 0.70 * age + 1.4
            }
            return BFP.toFixed(2)
        }
    }

    static basalMetabolicRate(gender, weight, height, age) {
        let s = 0

        if (gender == "male") {
            s = +5
        }

        if (gender == "female") {
            s = -161
        }

        const BMR = (weight * 10) + (height * 6.25) - (age * 5) + s
        return BMR.toFixed(2)
    }

    static calculateAll(height, weight, age, gender) {
        this.leanBodyMass(gender, weight, height)
        this.bodyMassIndex(weight, height)
        this.bodyFatPercentage(gender, age, weight, height)
        this.basalMetabolicRate(gender, weight, height, age)
    }
}

module.exports = Calculator