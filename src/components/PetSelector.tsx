import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface PetSelectorProps {
  onSelect: (petType: string, age: string) => void
}

export const PetSelector = ({ onSelect }: PetSelectorProps) => {
  const [selectedPet, setSelectedPet] = useState<string | null>(null)
  const [selectedAge, setSelectedAge] = useState<string | null>(null)

  const pets = [
    { id: 'dog', label: 'Dog', icon: '🐕' },
    { id: 'cat', label: 'Cat', icon: '🐈' }
  ]

  const ages = [
    { id: 'puppy-kitten', label: 'Puppy/Kitten' },
    { id: 'adult', label: 'Adult' },
    { id: 'senior', label: 'Senior' }
  ]

  const handlePetClick = (petId: string) => {
    setSelectedPet(petId)
    if (selectedAge) {
      onSelect(petId, selectedAge)
    }
  }

  const handleAgeClick = (ageId: string) => {
    setSelectedAge(ageId)
    if (selectedPet) {
      onSelect(selectedPet, ageId)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Choose Your Pet</h3>
        <div className="grid grid-cols-2 gap-3">
          {pets.map((pet) => (
            <Button
              key={pet.id}
              variant={selectedPet === pet.id ? 'default' : 'outline'}
              onClick={() => handlePetClick(pet.id)}
              className="h-auto py-4 flex-col gap-2 text-base"
            >
              <span className="text-3xl">{pet.icon}</span>
              <span>{pet.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Pet Age</h3>
        <div className="grid grid-cols-3 gap-2">
          {ages.map((age) => (
            <Button
              key={age.id}
              variant={selectedAge === age.id ? 'default' : 'outline'}
              onClick={() => handleAgeClick(age.id)}
              size="sm"
              className="text-xs"
            >
              {age.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}