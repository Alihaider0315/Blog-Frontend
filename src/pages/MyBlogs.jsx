import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Usercontext } from "../context/Usercontext";
import axios from "axios";
import { URL } from "../url";
import HomePosts from "../components/HomePosts";
import Loader from "../components/Loader";

const MyBlogs = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(Usercontext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      if (user) {
        const res = await axios.get(URL + "/api/posts/user/" + user._id);
        setPosts(res.data);
        if (res.data.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }
        setLoader(false);
      } else {
        setNoResults(true);
        setLoader(false);
      }
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user, search]);

  return (
    <div>
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <Link key={post._id} to={user ? `/posts/post/${post._id}` : "/login"}>
              <HomePosts post={post} />
            </Link>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
