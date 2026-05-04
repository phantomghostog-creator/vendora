import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Tech Enthusiast",
    content: "The quality of these headphones is insane. I've used Bose and Sony, but the build quality and sound profile here are on another level.",
    avatar: "https://i.pravatar.cc/100?img=33"
  },
  {
    name: "Sarah Miller",
    role: "Digital Nomad",
    content: "My Smart Watch Pro has become my best travel companion. The battery life is incredible and the GPS is incredibly accurate.",
    avatar: "https://i.pravatar.cc/100?img=44"
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    content: "Minimalist design, maximum performance. The shipping was lightning fast and the customer service responded in minutes.",
    avatar: "https://i.pravatar.cc/100?img=55"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 text-white">
          <h2 className="font-bold uppercase tracking-widest text-sm mb-3">Testimonials</h2>
          <p className="text-3xl lg:text-4xl font-extrabold">Loved by Professionals Worldwide</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl relative">
              <Quote className="absolute top-6 right-8 text-white/20" size={48} />
              <div className="flex text-yellow-400 mb-4">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-white text-lg italic mb-8 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 border-2 border-white/30" />
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-blue-200 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
