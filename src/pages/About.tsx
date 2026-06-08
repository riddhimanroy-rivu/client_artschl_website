import { Link } from 'react-router-dom';
import { Award, BookOpen, Heart, Palette, Target, Users, Lightbulb, GraduationCap } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">About ARTLINE</h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto">Discover our story, our mission, and the passion that drives us to nurture creativity</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title mb-6">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              ARTLINE was founded with a simple yet powerful vision: to provide quality art education that is accessible, enjoyable, and transformative. What began as a small drawing class in Thakurpukur has grown into one of Kolkata's most respected fine arts schools.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Over the years, we have trained more than 500 students, many of whom have gone on to win awards, pursue careers in art and design, and develop a lifelong passion for creativity. Our approach combines traditional techniques with modern teaching methods to create a learning experience that is both structured and inspiring.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Located in the heart of Thakurpukur, Kolkata, our school provides a warm, welcoming environment where students of all ages can explore their artistic potential. We believe that art is not just a skill but a way of seeing the world differently.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Art class" className="rounded-xl shadow-lg w-full h-48 object-cover" />
            <img src="https://images.pexels.com/photos/1389360/pexels-photo-1389360.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Student painting" className="rounded-xl shadow-lg w-full h-48 object-cover mt-8" />
            <img src="https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Drawing session" className="rounded-xl shadow-lg w-full h-48 object-cover" />
            <img src="https://images.pexels.com/photos/1194255/pexels-photo-1194255.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Art materials" className="rounded-xl shadow-lg w-full h-48 object-cover mt-8" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-royal-600">
              <Target className="w-10 h-10 text-royal-600 mb-4" />
              <h3 className="font-display text-2xl font-bold text-royal-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide exceptional art education that nurtures creativity, builds technical skills, and inspires personal expression. We aim to make quality art training accessible to everyone, regardless of age or prior experience, and to create a supportive community where artistic talent can flourish.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-gold-500">
              <Lightbulb className="w-10 h-10 text-gold-500 mb-4" />
              <h3 className="font-display text-2xl font-bold text-royal-800 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading fine arts school in Kolkata, recognized for producing skilled artists and creative thinkers. We envision a world where every person has the opportunity to explore their artistic potential and where art education is valued as an essential part of personal development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Meet Your Teacher</h2>
        </div>
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-royal p-8 text-center">
            <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 border-4 border-gold-400">
              <GraduationCap className="w-14 h-14 text-gold-400" />
            </div>
            <h3 className="font-display text-3xl font-bold text-white">Amit Roy</h3>
            <p className="text-gold-300 text-lg mt-1">Founder & Head Teacher</p>
          </div>
          <div className="p-8">
            <p className="text-gray-600 leading-relaxed mb-4">
              Amit Roy is the heart and soul of ARTLINE. With over a decade of experience in art education, Amit Sir has dedicated his career to helping students discover and develop their artistic abilities. His unique teaching methodology combines structured skill-building with creative exploration, ensuring that every student receives both technical guidance and artistic freedom.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Known for his patience, encouragement, and deep knowledge of various art forms, Amit Sir creates a learning environment where students feel confident to experiment and grow. Under his mentorship, many students have won state and national level art competitions.
            </p>
            <p className="text-gray-600 leading-relaxed">
              His areas of expertise include pencil sketching, watercolor painting, acrylic painting, oil painting, and mixed media art. He believes that everyone has an artist within, and with the right guidance, that artist can truly shine.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose ARTLINE */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Why Choose ARTLINE?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Palette, title: 'Expert Guidance', desc: 'Learn from an experienced teacher who provides personalized attention and structured curriculum' },
              { icon: Users, title: 'Small Class Sizes', desc: 'Limited students per batch ensures individual attention and faster skill development' },
              { icon: BookOpen, title: 'Comprehensive Curriculum', desc: 'From basic sketching to advanced painting techniques, we cover all aspects of fine arts' },
              { icon: Heart, title: 'Supportive Environment', desc: 'A warm and encouraging atmosphere where students feel confident to express their creativity' },
              { icon: Award, title: 'Proven Track Record', desc: '500+ students trained, 50+ awards won, and 10+ years of excellence in art education' },
              { icon: GraduationCap, title: 'All Ages Welcome', desc: 'Programs designed for children, teenagers, and adults with age-appropriate teaching methods' },
            ].map((item, i) => (
              <div key={i} className="card p-6 hover:-translate-y-1">
                <div className="w-12 h-12 bg-royal-50 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-royal-600" />
                </div>
                <h3 className="font-display text-lg font-semibold text-royal-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Link to="/admission" className="btn-primary text-lg inline-flex items-center gap-2">
          Join ARTLINE Today <Award className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
