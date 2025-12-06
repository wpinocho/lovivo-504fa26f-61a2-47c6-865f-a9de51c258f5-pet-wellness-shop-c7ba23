import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/ProductCard'
import { CollectionCard } from '@/components/CollectionCard'
import { FloatingCart } from '@/components/FloatingCart'
import { NewsletterSection } from '@/components/NewsletterSection'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { PetSelector } from '@/components/PetSelector'
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex'

interface IndexUIProps {
  logic: UseIndexLogicReturn
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic

  const [showSelector, setShowSelector] = useState(false)

  const handlePetSelection = (petType: string, age: string) => {
    console.log('Selected:', petType, age)
    // Scroll to products
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }, 300)
  }

  return (
    <EcommerceTemplate showCart={true}>
      {/* Hero Section - Japanese Minimal Style */}
      <section className="relative bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh] py-12">
            {/* Left - Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-light tracking-tight">
                  Premium Pet
                  <br />
                  <span className="font-normal">Wellness</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                  Thoughtfully crafted nutrition and supplements for your beloved companions. 
                  Natural ingredients, minimal processing, maximum care.
                </p>
              </div>

              {/* Pet Selector */}
              <div className="max-w-md">
                {!showSelector ? (
                  <Button 
                    size="lg" 
                    onClick={() => setShowSelector(true)}
                    className="w-full sm:w-auto"
                  >
                    Find Perfect Nutrition
                  </Button>
                ) : (
                  <div className="p-6 border rounded-sm bg-card">
                    <PetSelector onSelect={handlePetSelection} />
                  </div>
                )}
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap gap-8 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary"></div>
                  <span>Organic Ingredients</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary"></div>
                  <span>Vet Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary"></div>
                  <span>Made in USA</span>
                </div>
              </div>
            </div>

            {/* Right - Hero Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-sm overflow-hidden">
                <img 
                  src="/src/assets/hero-pets.jpg"
                  alt="Golden retriever and gray cat sitting together in zen garden"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-t border-l border-border opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      {!loadingCollections && collections.length > 0 && (
        <section id="collections" className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 space-y-2">
              <h2 className="text-3xl font-light tracking-tight">
                Shop by Category
              </h2>
              <p className="text-muted-foreground">
                Curated selections for every need
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {collections.map((collection) => (
                <CollectionCard 
                  key={collection.id} 
                  collection={collection} 
                  onViewProducts={handleViewCollectionProducts} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-light tracking-tight mb-2">
                {selectedCollectionId 
                  ? collections.find(c => c.id === selectedCollectionId)?.name
                  : 'Featured Products'
                }
              </h2>
              {selectedCollectionId && (
                <p className="text-sm text-muted-foreground">
                  {collections.find(c => c.id === selectedCollectionId)?.description}
                </p>
              )}
            </div>
            {selectedCollectionId && (
              <Button 
                variant="outline" 
                onClick={handleShowAllProducts}
              >
                View All
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card border rounded-sm h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No products available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light tracking-tight">
              Wellness Philosophy
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-medium">Natural Ingredients</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Only premium, organic ingredients sourced from trusted suppliers. No artificial additives or fillers.
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="font-medium">Science-Backed</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Formulated by veterinary nutritionists using the latest research in pet health and wellness.
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">💚</span>
              </div>
              <h3 className="font-medium">Sustainable</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Eco-friendly packaging and ethical sourcing. We care about the planet as much as your pets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      <FloatingCart />
    </EcommerceTemplate>
  )
}