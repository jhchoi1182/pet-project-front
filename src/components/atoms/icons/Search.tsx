import React from "react";

interface SearchProps extends React.HTMLAttributes<HTMLButtonElement> {}

export default function Search({ ...props }: SearchProps) {
  return (
    <button data-testid={`search_button`} {...props}>
      <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M31.219 28.806L24.7871 22.374C26.3356 20.3125 27.1716 17.8033 27.1688 15.225C27.1688 8.63926 21.8107 3.28125 15.225 3.28125C8.63926 3.28125 3.28125 8.63926 3.28125 15.225C3.28125 21.8107 8.63926 27.1688 15.225 27.1688C17.8033 27.1716 20.3125 26.3356 22.374 24.7871L28.806 31.219C29.1315 31.5101 29.5562 31.6654 29.9927 31.6532C30.4293 31.641 30.8446 31.4621 31.1533 31.1533C31.4621 30.8446 31.641 30.4293 31.6532 29.9927C31.6654 29.5562 31.5101 29.1315 31.219 28.806ZM6.69375 15.225C6.69375 13.5377 7.1941 11.8882 8.13152 10.4853C9.06895 9.08234 10.4013 7.98886 11.9602 7.34315C13.5191 6.69744 15.2345 6.5285 16.8894 6.85768C18.5443 7.18686 20.0644 7.99938 21.2575 9.19249C22.4506 10.3856 23.2631 11.9057 23.5923 13.5606C23.9215 15.2155 23.7526 16.9309 23.1068 18.4898C22.4611 20.0486 21.3677 21.381 19.9647 22.3185C18.5618 23.2559 16.9123 23.7562 15.225 23.7562C12.9632 23.7535 10.7948 22.8538 9.19549 21.2545C7.59616 19.6552 6.69646 17.4868 6.69375 15.225Z"
          fill="#FBC531"
        />
      </svg>
    </button>
  );
}
