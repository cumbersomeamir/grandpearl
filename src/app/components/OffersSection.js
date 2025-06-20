'use client'

export default function OffersSection() {
  const offers = [
    {
      icon: '🌼',
      title: 'Mehendi, Sangeet & Haldi on Rooftop',
      description: 'Exclusive offer from November to March'
    },
    {
      icon: '🛏️',
      title: 'Short Stay Room Booking',
      description: 'Single occupancy 1–3 hours – ₹1500 only'
    },
    { icon: '🎂', title: 'Birthday Parties & Anniversaries' },
    { icon: '👶', title: 'Mundan Function' },
    { icon: '💍', title: 'Tilak & Engagement' },
    { icon: '❤️', title: 'Weddings' },
    { icon: '🏢', title: 'Conferences' },
    { icon: '🎓', title: 'Fresher/Farewell/College Parties' }
  ]

  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-charcoal to-black overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-10 left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-10 w-60 h-60 bg-antique-gold/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16 fade-slide-up">
          <h2 className="text-5xl md:text-7xl font-bold text-white font-cormorant">
            Special <span className="text-gold">Offers</span>
          </h2>
          <p className="text-xl text-gray-300 mt-4 font-light">
            Celebrate your moments with our limited-time deals
          </p>
        </div>
        <div className="stagger-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, idx) => (
            <div
              key={idx}
              className="offer-card bg-gradient-to-br from-midnight to-charcoal p-8 rounded-3xl border border-gold/20 hover:border-gold transition-all"
            >
              <div className="text-4xl mb-4">{offer.icon}</div>
              <h3 className="text-2xl font-bold text-white font-cormorant mb-2">
                {offer.title}
              </h3>
              {offer.description && (
                <p className="text-gray-400 font-light">{offer.description}</p>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-gray-300 mt-12 font-light">
          For details and bookings contact{' '}
          <span className="text-gold font-semibold">+91 7081207081</span>
        </p>
      </div>
    </section>
  )
}
