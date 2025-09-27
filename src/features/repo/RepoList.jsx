import React from 'react';
import { FaGithub, FaStar, FaExclamationCircle } from 'react-icons/fa';
import { useListReposQuery, useSubscribeMutation } from './repoApiSlice';

function LoadingSkeleton() {
  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
        <div className="h-5 bg-slate-700/50 rounded w-32 animate-pulse"></div>
        <div className="h-4 bg-slate-700/30 rounded w-64 mt-2 animate-pulse"></div>
      </div>
      <div className="divide-y divide-slate-700/20">
        {[1, 2, 3].map(i => (
          <div key={i} className="px-4 py-3 flex items-center justify-between animate-pulse">
            <div className="flex-1">
              <div className="h-4 bg-slate-700/50 rounded w-2/3 mb-2"></div>
              <div className="h-3 bg-slate-700/30 rounded w-1/3"></div>
            </div>
            <div className="h-8 bg-slate-700/50 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RepoCard({ repo, isSubscribed }) {
  const [subscribe, { isLoading: isSubscribing }] = useSubscribeMutation();

  const handleSubscribe = async () => {
    try {
      await subscribe({ owner: repo.owner, name: repo.name });
    } catch (err) {
      console.error('Failed to subscribe:', err);
    }
  };

  return (
    <div className="py-3 border-b border-slate-700/20 flex items-center justify-between">
      <div className="flex-1">
        <a 
          href={`https://github.com/${repo.owner}/${repo.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-300 hover:text-white font-mono"
        >
          {repo.owner}/{repo.name}
        </a>
        <div className="text-sm text-slate-400 mt-1">
          <span>{repo.stars || 0} stars</span>
          <span className="mx-2">•</span>
          <span>{repo.issues || 0} issues</span>
        </div>
      </div>
      {isSubscribed ? (
        <span className="px-4 py-1 bg-emerald-600/20 text-emerald-400 text-sm font-medium rounded">
          ADDED!
        </span>
      ) : (
        <button
          onClick={handleSubscribe}
          disabled={isSubscribing}
          className="px-4 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded transition-colors"
        >
          {isSubscribing ? '...' : 'ADD'}
        </button>
      )}
    </div>
  );
}

export default function RepoList() {
  const { data, isLoading, isError, error } = useListReposQuery();

  console.log('Repository data:', data); // Debug log

  if (isLoading) return <LoadingSkeleton />;

  if (isError) {
    return (
      <div className="p-4 bg-red-900/20 border border-red-700/20 rounded text-center">
        <FaExclamationCircle className="text-red-400 text-2xl mx-auto mb-2" />
        <h3 className="text-red-400 font-medium mb-1">Failed to load repositories</h3>
        <p className="text-sm text-red-300">{error?.message || 'Please try again later'}</p>
      </div>
    );
  }

  // Handle undefined or null data
  if (!data) {
    return (
      <div className="p-4 bg-slate-800/20 border border-slate-700/20 rounded text-center">
        <FaGithub className="text-slate-400 text-2xl mx-auto mb-2" />
        <h3 className="text-slate-300 font-medium mb-1">No Data Available</h3>
        <p className="text-sm text-slate-400">Unable to fetch repository data.</p>
      </div>
    );
  }

  // Convert data to array if it's not already
  const repositories = Array.isArray(data) ? data : data.repositories || [];

  if (repositories.length === 0) {
    return (
      <div className="p-4 bg-slate-800/20 border border-slate-700/20 rounded text-center">
        <FaGithub className="text-slate-400 text-2xl mx-auto mb-2" />
        <h3 className="text-slate-300 font-medium mb-1">No Repositories Found</h3>
        <p className="text-sm text-slate-400">Try searching for different repositories or adjust your filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
        <h3 className="text-slate-300 font-medium">Your repos</h3>
        <p className="text-sm text-slate-400 mt-1">Only repos that have GitHub issues enabled are shown</p>
      </div>
      <div className="divide-y divide-slate-700/20">
        {repositories.map((repo) => (
          <RepoCard 
            key={`${repo.owner}/${repo.name}`} 
            repo={repo}
            isSubscribed={repo.isSubscribed}
          />
        ))}
      </div>
    </div>
  );
}
