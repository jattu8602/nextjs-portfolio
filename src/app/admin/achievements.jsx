import { useState, useEffect } from "react";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await fetch("/api/achievements");
      if (!response.ok) throw new Error("Failed to fetch achievements");
      const data = await response.json();
      setAchievements(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/achievements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add achievement");

      const newAchievement = await response.json();
      setAchievements([...achievements, newAchievement]);
      setFormData({ name: "", image: "", description: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section className="p-10 bg-gray-100">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <h2 className="text-3xl font-bold mb-4">Add New Achievement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Achievement Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Achievement"}
        </button>
      </form>

      <h3 className="text-2xl font-bold mt-10">Achievements</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {achievements.map((ach, index) => (
          <div
            key={index}
            className="p-4 border rounded-md bg-white shadow-md"
          >
            <img src={ach.image} alt={ach.name} className="w-full h-40 object-cover" />
            <h4 className="text-lg font-bold mt-2">{ach.name}</h4>
            <p className="text-sm">{ach.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
