const App = () => {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<CircleLayout />} />
          <Route path="/registerlogin" element={<RegisterLogin />} />
          <Route path="/rooms" element={<RoomSelectionPage />} />
          <Route path="/danke" element={<Danke />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
        </Routes>
      </>
    );
  };
  