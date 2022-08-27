import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/EventList";
import { Fragment } from "react";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage() {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filterYear = filterData[0];
  const filterMonth = filterData[1];

  //transforming the datas into numbers
  const numYear = +filterYear;
  const numMonth = +filterMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter, please adjust your values.</p>
        </ErrorAlert>
        <div className="center">
          <Button lin="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return;
    <Fragment>
      <ErrorAlert>
        <p>No events found for the chosen filter!</p>;
      </ErrorAlert>
      <div className="center">
        <Button lin="/events">Show All Events</Button>
      </div>
    </Fragment>;
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle>
        <EventList items={filteredEvents} />
      </ResultsTitle>
    </Fragment>
  );
}

export default FilteredEventsPage;
