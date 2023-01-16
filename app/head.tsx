export default function Head() {
  return (
    <>
        <title>Barefoot Recipes</title>
        <meta
          name="description"
          content="Get inspired in the kitchen with recipes from Asia and beyond, learn how to brew your own beer, wine, and other drinks at home"
        />
        <link rel="canonical" href="https://www.barefootrecipe.com/" />
        <meta name="keywords" content="Asian Food, Cooking, Blog, Brewing" />
        {/* twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Barefoot Chef Recipes Site" />
        <meta
          name="twitter:description"
          content="Get inspired in the kitchen with recipes from Asia and beyond, learn how to brew your own beer, wine, and other drinks at home"
        />
        <meta
          name="twitter:image:src"
          content="https://www.barefootrecipe.com/blog.jpg"
        />
        {/* open graph tags */}
        <meta
          property="og:title"
          content="Barefoot Chef Recipes Site"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="Get inspired in the kitchen with recipes from Asia and beyond, learn how to brew your own beer, wine, and other drinks at home"
          key="ogdesc"
        />
        <meta
          property="og:image"
          content="https://www.barefootrecipe.com/blog.jpg"
          key="ogimage"
        />
        <meta
          property="og:site_name"
          content="Barefoot Chef Recipes Site"
          key="Barefoot Recipes"
        />
        <meta
          property="og:url"
          content="https://barefootrecipe.com/"
          key="ogurl"
        />
        <meta property="og:type" content="article" key="ogtype" />
        <link rel="icon" href="/favicon.ico" />
      </>
  )
}
